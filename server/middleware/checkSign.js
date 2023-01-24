require('dotenv').config();

const { verifyToken } = require('../utils');

const checkSign = (req, res, next) => {
  try {
    const { env: { SECRET_KEY } } = process;
    const { cookies: { token } } = req;
    if (!token) {
      res.status(401).json({ error: 'Unauthorized' });
    } else {
      const { id } = verifyToken(token, SECRET_KEY);
      console.log('id: ', id);
      next();
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = checkSign;
