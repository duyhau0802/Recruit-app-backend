"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Employers", {
      id: {
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
      ten_cong_ty: {
        type: Sequelize.STRING,
      },
      address_cong_ty: {
        type: Sequelize.STRING,
      },
      province_code: {
        type: Sequelize.STRING,
      },
      quy_mo_cong_ty: {
        type: Sequelize.STRING,
      },
      mo_ta_cong_ty: {
        type: Sequelize.TEXT,
      },
      job_fields_code: {
        type: Sequelize.STRING,
      },
      website: {
        type: Sequelize.STRING,
      },
      sdt_cong_ty: {
        type: Sequelize.STRING,
      },
      logo_cong_ty: {
        type: Sequelize.STRING,
      },
      file_name: {
        type: Sequelize.STRING,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Employers");
  },
};
