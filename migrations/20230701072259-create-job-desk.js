'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('JobDesks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('JobDesks');
  }
};