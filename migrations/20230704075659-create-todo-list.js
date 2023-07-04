'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TodoLists', {
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
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Name Cannot Be Empty'
          },
          notEmpty: {
            msg: 'Name Cannot Be Empty'
          }
        }
      },
      JobDeskId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        validate: {
          notNull: {
            msg: 'JobDeskId Cannot Be Empty'
          },
          notEmpty: {
            msg: 'JobDeskId Cannot Be Empty'
          }
        },
        references: {
          model: 'JobDesks',
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
    await queryInterface.dropTable('TodoLists');
  }
};