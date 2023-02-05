const { Category } = require('../models');

const createCategory = async (name) => {
  const newCategory = await Category.create({ name });
  return newCategory;
};

const getAllCategories = async () => {
  const categories = await Category.findAll();
  return categories;
};

const getCategoryById = async (id) => {
  const category = await Category.findByPk(id);
  return category;
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
};