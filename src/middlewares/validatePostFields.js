module.exports = (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  const postFields = { title, content, categoryIds };

  const postValues = Object.values(postFields);
  const validatePostValues = postValues.every((values) => values);

  const message = 'Some required fields are missing';
  if (!validatePostValues) return res.status(400).json({ message });

  next();
};