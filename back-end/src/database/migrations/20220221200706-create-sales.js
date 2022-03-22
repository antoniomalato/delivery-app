'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sales', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      // referência do model user
      user_id: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        allowNull: false,
        defaultValue: 0,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'

      },
      seller_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
        defaultValue: 0,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'

      },

      total_price: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0,
      },
      delivery_address: {
        type: Sequelize.STRING
      },
      delivery_number: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: '',
      },
      sale_date: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: '',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('sales');
  }
};
