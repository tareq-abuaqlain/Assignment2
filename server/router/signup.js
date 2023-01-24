const signupRouter = require('express').Router();
const { signupController } = require('../controller');

signupRouter.post('/', signupController);

module.exports = signupRouter;
