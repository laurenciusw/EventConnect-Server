'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class JobDesk extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      JobDesk.hasMany(models.ToDoList, { foreignKey: "JobDeskId" });
      JobDesk.belongsToMany(models.User, {
        through: models.UserEvent,
        foreignKey: "JobDeskId",
      });
      JobDesk.belongsTo(models.Event, { foreignKey: 'EventId', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    }
  }
  JobDesk.init({
    EventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    }
  }, {
    sequelize,
    modelName: "JobDesk",
  }
  );
  return JobDesk;
};
