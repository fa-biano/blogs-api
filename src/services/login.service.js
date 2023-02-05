const { User } = require('../models');

const getUserLogin = (email) => {
  const user = User.findOne({ where: { email } });
  return user;
};

module.exports = {
  getUserLogin,
};