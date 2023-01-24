const { sign, verify } = require('jsonwebtoken');

const verifyToken = (token, secret) => new Promise((resolve, reject) => {
  verify(token, secret, (err, decoded) => {
    if (err) {
      err.status(401);
      reject(err);
    }
    resolve(decoded);
  });
});

const signToken = (payload, secret) => new Promise((resolve, reject) => {
  sign(payload, secret, (err, token) => {
    if (err) {
      err.status(401);
      reject(err);
    }
    resolve(token);
  });
});

module.exports = {
  signToken,
  verifyToken,
};
