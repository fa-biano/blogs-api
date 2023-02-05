const categoriesRouter = require('express').Router();

const { categoriesController } = require('../controllers');
const { tokenValidation } = require('../middlewares');

categoriesRouter.get('/', tokenValidation, categoriesController.getAllCategories);
categoriesRouter.post('/', tokenValidation, categoriesController.createCategory);

module.exports = categoriesRouter;