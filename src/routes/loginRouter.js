const loginRouter = require('express').Router();

const { loginController } = require('../controllers');

loginRouter.post('/', loginController.signIn);

module.exports = loginRouter;