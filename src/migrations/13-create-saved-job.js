"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Saved_jobs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_ung_vien: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Applicants",
          key: "id",
        },
        onUpdate: "RESTRICT",
        onDelete: "CASCADE",
      },
      id_tin: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Jobs",
          key: "id",
        },
        onUpdate: "RESTRICT",
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Saved_jobs");
  },
};
