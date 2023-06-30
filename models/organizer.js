'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class Organizer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Organizer.hasMany(models.Event, {foreignKey: 'OrganizerId'})
    }
  }
  Organizer.init({
    organizerName: {
      type: DataTypes.STRING,
      allowNull: false,
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
      type: DataTypes.STRING,
      allowNull: false,
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
      type: DataTypes.STRING,
      allowNull: false,
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
      type: DataTypes.STRING,
      allowNull: false,
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
      type: DataTypes.STRING,
      allowNull: false,
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
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Contact Person Cannot Be Empty'
        },
        notEmpty: {
          msg: 'Contact Person Cannot Be Empty'
        }
      }
    },
    email: {
        allowNull: false,
        type: DataTypes.STRING,
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
        type: DataTypes.STRING,
        validate: {
          notNull: {
            msg: 'Password Cannot Be Empty'
          },
          notEmpty: {
            msg: 'Password Cannot Be Empty'
          }
        }
      }
  }, {
    sequelize,
    modelName: 'Organizer',
  });

  Organizer.beforeCreate(async (organizer, options) => {
    const hashedPassword = await hashPassword(organizer.password);
    organizer.password = hashedPassword;
  });

  return Organizer;
};