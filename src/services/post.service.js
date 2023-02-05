const Sequelize = require('sequelize');
const { BlogPost, PostCategory, User, Category } = require('../models');
const { getCategoryById } = require('./categories.service');
const config = require('../config/config');

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);

const { Op } = Sequelize;

const checkCategoryId = async (catIdArray) => {
  const checkId = catIdArray.map((id) => getCategoryById(id));
  const idsChecked = await Promise.all(checkId);

  const allIdsExists = idsChecked.every((id) => id !== null);
  return allIdsExists;
};

const createPost = async (title, content, categoryIds, userId) => {
  const validate = await checkCategoryId(categoryIds);
  if (!validate) return { type: 'NOT_FOUND', message: 'one or more "categoryIds" not found' };

  const transaction = await sequelize.transaction();

  try {
    const published = new Date();
    const newPost = await BlogPost.create(
      { title, content, userId, published, updated: published }, { transaction },
    );
  
    await categoryIds.forEach(async (category) => {
      await PostCategory.create({ postId: newPost.id, categoryId: category });
    }, { transaction });

    await transaction.commit();
    return { type: null, message: newPost };
  } catch (err) {
    await transaction.rollback();
    console.log(err);
    throw err;
  }
};

const getAllPosts = async () => {
  const posts = await BlogPost.findAll(
    { include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ] },
);
  return posts;
};

const getPostsById = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return post;
};

const checkPostOwner = async (currentPost, loggedUserId) => {
  const { userId } = currentPost;
  const isPostOwner = loggedUserId === userId;
  return isPostOwner;
};

const updatePost = async (toUpdate) => {
  const { loggedUserId, postId, title, content, categoryIds } = toUpdate;

  const currentPost = await getPostsById(postId);
  if (currentPost === null) {
    return { type: 'POST_NOT_FOUND', status: 404, message: 'Post does not exist' };
  }

  const isPostOwner = await checkPostOwner(currentPost, loggedUserId);
  if (!isPostOwner) return { type: 'NOT_OWNER', status: 401, message: 'Unauthorized user' };
    
  await BlogPost.update(
    { title, content, categoryIds, updated: new Date() },
    { where: { id: postId } },
  );

  const updated = await getPostsById(postId);
  return { type: null, status: 200, message: updated };
};

const removePost = async (loggedUserId, postId) => {
  const currentPost = await getPostsById(postId);
  if (currentPost === null) return { type: 'POST_NOT_FOUND', message: 'Post does not exist' };

  const isPostOwner = await checkPostOwner(currentPost, loggedUserId);
  if (!isPostOwner) return { type: 'NOT_OWNER', message: 'Unauthorized user' };

  await BlogPost.destroy({ where: { id: postId } });
  await PostCategory.destroy({ where: { postId } });
  return { type: null, message: '' };
};

const searchByTerm = async (term) => {
  const search = await BlogPost.findAll({
    where: { 
      [Op.or]: [
        { title: { [Op.substring]: term } },
        { content: { [Op.substring]: term } },
      ],
    },
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return search;
};

module.exports = {
  createPost,
  getAllPosts,
  getPostsById,
  updatePost,
  removePost,
  searchByTerm,
};