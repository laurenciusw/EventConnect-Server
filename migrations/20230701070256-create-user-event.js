"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("UserEvents", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      EventId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Events",
          key: "id",
        },
      },
      JobDeskId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "JobDesks",
          key: "id",
        },
      },
      summary: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      isClaim: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("UserEvents");
  },
};
