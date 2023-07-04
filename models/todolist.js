'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TodoList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TodoList.belongsTo(models.Event, {foreignKey: 'EventId', onDelete: 'CASCADE', onUpdate: 'CASCADE'})
      TodoList.belongsTo(models.JobDesk, {foreignKey: 'JobDeskId', onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    }
  }
  TodoList.init({
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
    },
    JobDeskId: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    }
  }, {
    sequelize,
    modelName: 'TodoList',
  });
  return TodoList;
};