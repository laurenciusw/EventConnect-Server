"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ToDoList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ToDoList.belongsTo(models.JobDesk, { foreignKey: "JobDeskId" });
    }
  }
  ToDoList.init(
    {
      name: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      JobDeskId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ToDoList",
    }
  );
  return ToDoList;
};
