'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Organizers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      organizerName: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notNull: {
            msg: 'Organizer Name Cannot Be Empty'
          },
          notEmpty: {
            msg: 'Organizer Name Cannot Be Empty'
          }
        }
      },
      type: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notNull: {
            msg: 'Type Cannot Be Empty'
          },
          notEmpty: {
            msg: 'Type Cannot Be Empty'
          }
        }
      },
      dateFound: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notNull: {
            msg: 'Date Found Cannot Be Empty'
          },
          notEmpty: {
            msg: 'Date Found Cannot Be Empty'
          }
        }
      },
      personName: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notNull: {
            msg: 'Person Name Cannot Be Empty'
          },
          notEmpty: {
            msg: 'Person Name Cannot Be Empty'
          }
        }
      },
      contactPerson: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notNull: {
            msg: 'Contact Person Cannot Be Empty'
          },
          notEmpty: {
            msg: 'Contact Person Cannot Be Empty'
          }
        }
      },
      contactOrganizer: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notNull: {
            msg: 'Contact Organizer Cannot Be Empty'
          },
          notEmpty: {
            msg: 'Contact Organizer Cannot Be Empty'
          }
        }
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          isEmail: {
            msg: 'Must Be Email Format'
          },
          notNull: {
            msg: 'Email Cannot Be Empty'
          },
          notEmpty: {
            msg: 'Email Cannot Be Empty'
          }
        }
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notNull: {
            msg: 'Password Cannot Be Empty'
          },
          notEmpty: {
            msg: 'Password Cannot Be Empty'
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
    await queryInterface.dropTable('Organizers');
  }
};