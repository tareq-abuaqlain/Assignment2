require('dotenv').config();

const { signToken } = require('../utils');

const setCookie = async (req, res, id) => {
  try {
    const { env: { SECRET_KEY } } = process;
    const token = await signToken(id, SECRET_KEY);
    return res.cookie('token', token, {
      maxAge: 300000000,
      httpOnly: true,
      sameSite: true,
    }).status(200).json({ message: 'Signup successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = setCookie;
