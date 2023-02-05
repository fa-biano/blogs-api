'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('blog_posts', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      title: { type: Sequelize.STRING, allowNull: false },
      content: { type: Sequelize.STRING, allowNull: false },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'user_id',
        reference : {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      published: { type: Sequelize.DATE, allowNull: false },
      updated: { type: Sequelize.DATE, allowNull: false },
    },
    {
      // onUpdate: 'CASCADE',
      // onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('blog_posts');
  }
};
