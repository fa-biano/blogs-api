const { User } = require('../models');

const createUser = async (displayName, email, password, image) => {
  const newUser = await User.create({ displayName, email, password, image });
  return newUser;
};

const getUsers = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  return users;
};

const getUserById = async (id) => {
  const user = await User.findOne({
    where: { id },
    attributes: { exclude: ['password'] },
  });
  return user;
};

const removeUser = async (loggedUserId) => {
  await User.destroy({ where: { id: loggedUserId } });
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  removeUser,
};