'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Benefit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Benefit.belongsTo(models.Event, {foreignKey: 'EventId', onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    }
  }
  Benefit.init({
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
      }
    }
  }, {
    sequelize,
    modelName: 'Benefit',
  });
  return Benefit;
};