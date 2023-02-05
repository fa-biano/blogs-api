const { loginService } = require('../services');
const newToken = require('../utils/token');

const validateLoginFields = ({ email, password }) => {
  let validate = false;

  if (!email || !password) {
    validate = 'Some required fields are missing';
  }

  return validate;
};

  const signIn = async (req, res) => {
    const { email, password } = req.body;
    const validate = validateLoginFields({ email, password });

    if (validate) return res.status(400).json({ message: validate });

    const user = await loginService.getUserLogin(email);

    if (!user || password !== user.password) {
      return res.status(400).json({ message: 'Invalid fields' });
    }

    const payload = {
      user: {
        id: user.id,
        name: user.displayName,
      },
    };

    const token = newToken(payload);
    return res.status(200).json({ token });
  };

  module.exports = {
    signIn,
  };