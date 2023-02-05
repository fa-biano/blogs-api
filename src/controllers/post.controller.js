const { postService } = require('../services');

const INTERNAL_SERVER_ERROR = 'Ocorreu um erro';

const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { id: userId } = req.user;

  try {
    const { type, message } = await postService.createPost(title, content, categoryIds, userId);
    if (type) return res.status(400).json({ message });
    return res.status(201).json(message);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: INTERNAL_SERVER_ERROR });
  }
};

const getAllPosts = async (_req, res) => {
  try {
    const posts = await postService.getAllPosts();
    return res.status(200).json(posts);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: INTERNAL_SERVER_ERROR });
  }
};

const getPostsById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postService.getPostsById(id);
    if (!post) return res.status(404).json({ message: 'Post does not exist' });
    return res.status(200).json(post);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: INTERNAL_SERVER_ERROR });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id: loggedUserId } = req.user;
    const { id: postId } = req.params;
    const { title, content, categoryIds } = req.body;

    if (title === '' || content === '') {
      return res.status(400).json({ message: 'Some required fields are missing' });
    }

    const { type, status, message } = await postService
      .updatePost({ loggedUserId, postId, title, content, categoryIds });

    if (type) return res.status(status).json({ message });
    return res.status(status).json(message);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: INTERNAL_SERVER_ERROR });
  }
};

const removePost = async (req, res) => {
  try {
    const { id: loggedUserId } = req.user;
    const { id: postId } = req.params;

    const { type, message } = await postService.removePost(loggedUserId, postId);
    if (type === 'POST_NOT_FOUND') return res.status(404).json({ message });
    if (type === 'NOT_OWNER') return res.status(401).json({ message });
    return res.status(204).end();
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: INTERNAL_SERVER_ERROR });
  }
};

const searchByTerm = async (req, res) => {
  const { q } = req.query;

  try {
    const search = await postService.searchByTerm(q);
    return res.status(200).json(search);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: INTERNAL_SERVER_ERROR });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostsById,
  updatePost,
  removePost,
  searchByTerm,
};