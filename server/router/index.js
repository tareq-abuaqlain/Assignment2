const { Router } = require('express');

const signupRouter = require('./signup');

const router = Router();

router.use('/signup', signupRouter);

module.exports = router;
