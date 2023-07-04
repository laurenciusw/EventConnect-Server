'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Events', {
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
      location: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notNull: {
            msg: 'Location Cannot Be Empty'
          },
          notEmpty: {
            msg: 'Location Cannot Be Empty'
          }
        }
      },
      startDate: {
        allowNull: false,
        type: Sequelize.DATE,
        validate: {
          notNull: {
            msg: 'Start Date Cannot Be Empty'
          },
          notEmpty: {
            msg: 'Start Date Cannot Be Empty'
          }
        }
      },
      imageUrl: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notNull: {
            msg: 'Image Cannot Be Empty'
          },
          notEmpty: {
            msg: 'Image Cannot Be Empty'
          }
        }
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notNull: {
            msg: 'Description Cannot Be Empty'
          },
          notEmpty: {
            msg: 'Description Cannot Be Empty'
          }
        }
      },
      endDate: {
        allowNull: false,
        type: Sequelize.DATE,
        validate: {
          notNull: {
            msg: 'End Date Cannot Be Empty'
          },
          notEmpty: {
            msg: 'End Date Cannot Be Empty'
          }
        }
      },
      registrationDate: {
        allowNull: false,
        type: Sequelize.DATE,
        validate: {
          notNull: {
            msg: 'Registration Date Cannot Be Empty'
          },
          notEmpty: {
            msg: 'Registration Date Cannot Be Empty'
          }
        }
      },
      category: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notNull: {
            msg: 'Category Cannot Be Empty'
          },
          notEmpty: {
            msg: 'Category Cannot Be Empty'
          }
        }
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notNull: {
            msg: 'Status Cannot Be Empty'
          },
          notEmpty: {
            msg: 'Status Cannot Be Empty'
          }
        }
      },
      OrganizerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        validate: {
          notNull: {
            msg: 'Password Cannot Be Empty'
          },
          notEmpty: {
            msg: 'Password Cannot Be Empty'
          }
        },
        references: {
          model: 'Organizers',
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
    await queryInterface.dropTable('Events');
  }
};