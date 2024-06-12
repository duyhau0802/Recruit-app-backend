"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Applicant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Applicant.belongsTo(models.Province, {
        foreignKey: "province_code",
        targetKey: "code",
        as: "provinceData",
      });
      Applicant.belongsTo(models.User, {
        foreignKey: "user_id",
        targetKey: "id",
        as: "userData",
      });
      Applicant.belongsTo(models.Job_field, {
        foreignKey: "desire_job_field",
        targetKey: "code",
        as: "jobFieldData",
      });
      Applicant.belongsTo(models.Province, {
        foreignKey: "desire_province",
        targetKey: "code",
        as: "provinceData",
      });
      Applicant.belongsTo(models.Job_type, {
        foreignKey: "desire_job_type",
        targetKey: "code",
        as: "jobTypeData",
      });
      Applicant.belongsTo(models.Salary, {
        foreignKey: "desire_salary",
        targetKey: "code",
        as: "salaryData",
      });
    }
  }
  Applicant.init(
    {
      user_id: DataTypes.INTERGER,
      // Ung vien detail
      gioi_tinh: DataTypes.STRING,
      ngay_sinh: DataTypes.DATE,
      dia_chi: DataTypes.SRING,
      province_code: DataTypes.STRING,
      sdt: DataTypes.STRING,

      // kinh nghiem thuc te
      bang_cap_code: DataTypes.STRING,
      kinh_nghiem: DataTypes.TEXT,
      ky_nang: DataTypes.STRING,
      // cong viec mong muon
      desire_job_field: DataTypes.STRING,
      desire_province: DataTypes.STRING,
      desire_job_type: DataTypes.STRING,
      desire_salary: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Applicant",
    }
  );
  return Applicant;
};
