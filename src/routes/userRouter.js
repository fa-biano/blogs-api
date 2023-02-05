const userRouter = require('express').Router();

const { userController } = require('../controllers');
const { tokenValidation } = require('../middlewares');

userRouter.post('/', userController.createUser);
userRouter.get('/', tokenValidation, userController.getUsers);
userRouter.get('/:id', tokenValidation, userController.getUserById);
userRouter.delete('/me', tokenValidation, userController.removeUser);

module.exports = userRouter;