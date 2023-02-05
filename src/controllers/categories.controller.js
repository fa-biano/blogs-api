const { categoriesService } = require('../services');

const createCategory = async (req, res) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: '"name" is required' });

  try {
    const newCategory = await categoriesService.createCategory(name);
    return res.status(201).json(newCategory);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: 'Ocorreu um erro' });
  }
};

const getAllCategories = async (_req, res) => {
  try {
    const categories = await categoriesService.getAllCategories();
    return res.status(200).json(categories);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: 'Ocorreu um erro' });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
};