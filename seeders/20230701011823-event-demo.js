"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require("../events.json");
    data.forEach((el) => {
      el.createdAt = el.updatedAt = new Date();
    });

    await queryInterface.bulkInsert("Events", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Events".null, {});
  },
};
