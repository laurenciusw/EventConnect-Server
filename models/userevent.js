"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserEvent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserEvent.belongsTo(models.User, { foreignKey: "UserId" });
      UserEvent.belongsTo(models.Event, { foreignKey: "EventId" });
      UserEvent.belongsTo(models.JobDesk, { foreignKey: "JobDeskId" });
    }
  }
  UserEvent.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
      },
      status: DataTypes.STRING,
      UserId: DataTypes.INTEGER,
      JobDeskId: DataTypes.INTEGER,
      summary: DataTypes.STRING,
      isClaim: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "UserEvent",
    }
  );
  return UserEvent;
};
