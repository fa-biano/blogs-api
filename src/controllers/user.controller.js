const Joi = require('joi');
const { loginService, userService } = require('../services');
const newToken = require('../utils/token');

const validateNewUser = (newUser) =>
  Joi.object({
    displayName: Joi.string().min(8).required().messages({
      'string.min': '"displayName" length must be at least 8 characters long',
    }),
    email: Joi.string().email().required().messages({
      'string.email': '"email" must be a valid email',
    }),
    password: Joi.string().min(6).required().messages({
      'string.min': '"password" length must be at least 6 characters long',
    }),
  }).validate(newUser);

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const { error } = validateNewUser({ displayName, email, password });

  if (error) return res.status(400).json({ message: error.details[0].message });

  const userAlredyExists = await loginService.getUserLogin(email);
  if (userAlredyExists) return res.status(409).json({ message: 'User already registered' });

  try {
    const newUser = await userService.createUser(displayName, email, password, image);
  
    const payload = {
      user: { id: newUser.id, name: newUser.displayName },
    };

    const token = newToken(payload);
    return res.status(201).json({ token });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: 'Ocorreu um erro' });
  }
};

const getUsers = async (_req, res) => {
  try {
    const users = await userService.getUsers();
    return res.status(200).json(users);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: 'Ocorreu um erro' });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);

    if (!user) return res.status(404).json({ message: 'User does not exist' });
    return res.status(200).json(user);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: 'Ocorreu um erro' });
  }
};

const removeUser = async (req, res) => {
  try {
    const { id: loggedUserId } = req.user;
    await userService.removeUser(loggedUserId);
    return res.status(204).end();
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: 'Ocorreu um erro' });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  removeUser,
};