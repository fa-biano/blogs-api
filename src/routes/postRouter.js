const postRouter = require('express').Router();
const { tokenValidation, validatePostFields } = require('../middlewares');
const { postController } = require('../controllers');

postRouter.post('/', tokenValidation, validatePostFields, postController.createPost);
postRouter.get('/search', tokenValidation, postController.searchByTerm);
postRouter.get('/', tokenValidation, postController.getAllPosts);
postRouter.get('/:id', tokenValidation, postController.getPostsById);
postRouter.put('/:id', tokenValidation, postController.updatePost);
postRouter.delete('/:id', tokenValidation, postController.removePost);

module.exports = postRouter;