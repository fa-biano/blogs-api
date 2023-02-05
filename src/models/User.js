module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
     },
    displayName: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  {
    underscored: true,
    timestamps: false,
  });

  User.associate = (models) => {
    User.hasMany(models.BlogPost, { as: 'posts', foreignKey: 'userId' })
  };

  return User;
};