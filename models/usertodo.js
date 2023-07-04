"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserTodo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserTodo.belongsTo(models.User, { foreignKey: "UserId" });
      UserTodo.belongsTo(models.TodoList, { foreignKey: "TodoListId" });
    }
  }
  UserTodo.init(
    {
      TodoListId: DataTypes.INTEGER,
      status: DataTypes.BOOLEAN,
      UserId: DataTypes.INTEGER,
      EventId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "UserTodo",
    }
  );
  return UserTodo;
};
