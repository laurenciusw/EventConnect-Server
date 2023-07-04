"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsToMany(models.Event, {
        through: models.UserEvent,
        foreignKey: "UserId",
      });
      User.belongsToMany(models.JobDesk, {
        through: models.UserEvent,
        foreignKey: "UserId",
      });
      User.belongsToMany(models.TodoList, {
        through: models.UserTodo,
        foreignKey: "UserId",
      });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Input the Username`,
          },
          notEmpty: {
            msg: `Input the Username`,
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [5],
            msg: `password min 5 character`,
          },
          notNull: {
            msg: `Input the password!`,
          },
          notEmpty: {
            msg: `Input the password!`,
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: `Email must be in email format`,
          },
          notNull: {
            msg: `Email cannot be empty`,
          },
          notEmpty: {
            msg: `Email cannot be empty`,
          },
        },
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Gender cannot be empty`,
          },
          notEmpty: {
            msg: `Gender cannot be empty`,
          },
        },
      },
      birthDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Birth Date cannot be empty`,
          },
          notEmpty: {
            msg: `Birth Date cannot be empty`,
          },
        },
      },
      province: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Province cannot be empty`,
          },
          notEmpty: {
            msg: `Province cannot be empty`,
          },
        },
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Province cannot be empty`,
          },
          notEmpty: {
            msg: `Province cannot be empty`,
          },
        },
      },
      phoneNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Phone Number cannot be empty`,
          },
          notEmpty: {
            msg: `Phone Number cannot be empty`,
          },
        },
      },
      profilePicture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Profile Picture cannot be empty`,
          },
          notEmpty: {
            msg: `Profile Picture cannot be empty`,
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate((user) => {
    user.password = hashPassword(user.password);
  });
  return User;
};
