"use strict";
const { Model } = require("sequelize");
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
      JobDesk.belongsTo(models.Event, { foreignKey: "EventId" });
    }
  }
  JobDesk.init(
    {
      EventId: DataTypes.INTEGER,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "JobDesk",
    }
  );
  return JobDesk;
};
