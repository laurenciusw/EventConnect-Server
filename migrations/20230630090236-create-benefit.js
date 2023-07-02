'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Benefits', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notNull: {
            msg: 'Name Cannot Be Empty'
          },
          notEmpty: {
            msg: 'Name Cannot Be Empty'
          }
        }
      },
      EventId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        validate: {
          notNull: {
            msg: 'EventId Cannot Be Empty'
          },
          notEmpty: {
            msg: 'EventId Cannot Be Empty'
          }
        },
        references: {
          model: 'Events',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Benefits');
  }
};