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
      Event.belongsToMany(models.User, {
        through: models.UserEvent,
        foreignKey: "EventId",
      });

      Event.hasMany(models.JobDesk, { foreignKey: "EventId" });
    }
  }
  Event.init(
    {
      name: DataTypes.STRING,
      location: DataTypes.STRING,
      startDate: DataTypes.DATE,
      imageUrl: DataTypes.STRING,
      description: DataTypes.TEXT,
      endDate: DataTypes.DATE,
      registrationDate: DataTypes.DATE,
      category: DataTypes.STRING,
      status: DataTypes.STRING,
      OrganizerId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Event",
    }
  );
  return Event;
};
