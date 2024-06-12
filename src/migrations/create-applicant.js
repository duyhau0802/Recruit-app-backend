"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Applicants", {
      id_ung_vien: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "RESTRICT",
        onDelete: "CASCADE",
      },
      gioi_tinh: {
        type: Sequelize.STRING,
      },
      ngay_sinh: {
        type: Sequelize.DATE,
      },
      dia_chi: {
        type: Sequelize.STRING,
      },
      province_code: {
        type: Sequelize.STRING,
      },
      sdt: {
        type: Sequelize.STRING,
      },
      bang_cap_code: {
        type: Sequelize.STRING,
      },
      kinh_nghiem: {
        type: Sequelize.TEXT,
      },
      ky_nang: {
        type: Sequelize.STRING,
      },
      desire_job_field: {
        type: Sequelize.STRING,
      },
      desire_province: {
        type: Sequelize.STRING,
      },
      desire_job_type: {
        type: Sequelize.STRING,
      },
      desire_salary: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Applicants");
  },
};
