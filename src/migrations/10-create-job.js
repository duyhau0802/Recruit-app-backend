"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Jobs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      vi_tri: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      so_luong: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      job_type_code: {
        type: Sequelize.STRING,
      },
      salary_code: {
        type: Sequelize.STRING,
      },
      province_cong_viec: {
        type: Sequelize.STRING,
      },
      address_cong_viec: {
        type: Sequelize.STRING,
      },
      job_field_code: {
        type: Sequelize.STRING,
      },
      mo_ta: {
        type: Sequelize.STRING,
      },
      quyen_loi: {
        type: Sequelize.STRING,
      },
      degree_code: {
        type: Sequelize.STRING,
      },
      kinh_nghiem: {
        type: Sequelize.STRING,
      },
      yeu_cau_cong_viec: {
        type: Sequelize.TEXT,
      },
      yeu_cau_ho_so: {
        type: Sequelize.TEXT,
      },
      deadline: {
        type: Sequelize.DATE,
      },
      id_employer: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      view_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
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
      deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Jobs");
  },
};
