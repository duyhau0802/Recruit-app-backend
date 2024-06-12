"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Resumes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      cv_link: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      id_ung_vien: {
        type: Sequelize.INTEGER,
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Applicants",
          key: "id",
        },
        onUpdate: "RESTRICT",
        onDelete: "CASCADE",
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Resumes");
  },
};
