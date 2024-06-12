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
        foreignKey: "linh_vuc_hoat_dong",
        targetKey: "code",
        as: "jobFieldData",
      });
    }
  }
  Employer.init(
    {
      user_id: DataTypes.INTERGER,
      // Ung vien detail
      ten_cong_ty: DataTypes.STRING,
      address_cong_ty: DataTypes.STRING,
      province_code: DataTypes.SRING,
      quy_mo_cong_ty: DataTypes.STRING,
      mo_ta_cong_ty: DataTypes.TEXT,
      linh_vuc_hoat_dong: DataTypes.STRING,
      website: DataTypes.STRING,
      sdt: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Employer",
    }
  );
  return Employer;
};
