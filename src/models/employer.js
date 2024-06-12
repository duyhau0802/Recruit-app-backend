"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Employer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Employer.belongsTo(models.Province, {
        foreignKey: "province_code",
        targetKey: "code",
        as: "provinceData",
      });
      Employer.belongsTo(models.User, {
        foreignKey: "user_id",
        targetKey: "id",
        as: "userData",
      });
      Employer.belongsTo(models.Job_field, {
        foreignKey: "job_fields_code",
        targetKey: "code",
        as: "jobFieldData",
      });
    }
  }
  Employer.init(
    {
      user_id: DataTypes.INTEGER,
      // Ung vien detail
      ten_cong_ty: DataTypes.STRING,
      address_cong_ty: DataTypes.STRING,
      province_code: DataTypes.STRING,
      quy_mo_cong_ty: DataTypes.STRING,
      mo_ta_cong_ty: DataTypes.TEXT,
      job_fields_code: DataTypes.STRING,
      website: DataTypes.STRING,
      sdt_cong_ty: DataTypes.STRING,
      logo_cong_ty: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Employer",
      timestamps: false,
    }
  );
  return Employer;
};
