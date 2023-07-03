"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Event.belongsToMany(models.User, {
        through: models.UserEvent,
        foreignKey: "EventId",
      });

      Event.hasMany(models.Benefit, { foreignKey: 'EventId', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
      Event.belongsTo(models.Organizer, { foreignKey: 'OrganizerId' })
      Event.hasMany(models.JobDesk, { foreignKey: 'EventId', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
      // Event.hasMany(models.Bookmark, {foreignKey: 'EventId'})
      // Event.hasMany(models.UserEvent, {foreignKey: 'EventId'})
    }
  }
  Event.init({
    name: {
      type: DataTypes.STRING,
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
    location: {
      type: DataTypes.STRING,
      allowNull: false,
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
      type: DataTypes.DATE,
      allowNull: false,
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
      type: DataTypes.STRING,
      allowNull: false,
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
      type: DataTypes.STRING,
      allowNull: false,
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
      type: DataTypes.DATE,
      allowNull: false,
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
      type: DataTypes.DATE,
      allowNull: false,
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
      type: DataTypes.STRING,
      allowNull: false,
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
      type: DataTypes.STRING,
      allowNull: false,
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
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Organizer Name Cannot Be Empty'
        },
        notEmpty: {
          msg: 'Organizer Name Cannot Be Empty'
        }
      },
      references: {
        model: 'Organizers',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};
