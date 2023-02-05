'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('posts_categories', {
      postId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        field: 'post_id',
        reference: {
          model: 'Blog_posts',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        field: 'category_id',
        reference: {
          model: 'Categories',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    },
    {
      timestamps: false,
      // onUpdate: 'CASCADE',
      // onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('posts_categories');
  }
};
