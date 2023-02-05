const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const newToken = (payload) => {
  const token = jwt.sign(payload, JWT_SECRET);
  return token;
};

module.exports = newToken;
