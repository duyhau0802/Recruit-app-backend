"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Applications", {
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
          key: "id_ung_vien",
        },
        onUpdate: "RESTRICT",
        onDelete: "CASCADE",
      },
      id_tin: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Jobs",
          key: "id_tin",
        },
        onUpdate: "RESTRICT",
        onDelete: "CASCADE",
      },
      id_employer: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Employers",
          key: "id_employer",
        },
        onUpdate: "RESTRICT",
        onDelete: "CASCADE",
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: "pending",
      },
      createdAt: {
        allowNull: false,
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Applications");
  },
};
