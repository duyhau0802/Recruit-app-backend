"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Job.belongsTo(models.Province, {
        foreignKey: "province_cong_viec",
        targetKey: "code",
        as: "provinceData",
      });
      Job.belongsTo(models.Job_type, {
        foreignKey: "job_type_code",
        targetKey: "code",
        as: "jobTypeData",
      });
      Job.belongsTo(models.Job_field, {
        foreignKey: "job_field_code",
        targetKey: "code",
        as: "jobFieldData",
      });
      Job.belongsTo(models.Salary, {
        foreignKey: "salary_code",
        targetKey: "code",
        as: "salaryData",
      });
      Job.belongsTo(models.Degree, {
        foreignKey: "degree_code",
        targetKey: "code",
        as: "degreeData",
      });
      Job.belongsTo(models.Employer, {
        foreignKey: "id_employer",
        targetKey: "id",
        as: "employerData",
      });
    }
  }
  Job.init(
    {
      vi_tri: DataTypes.STRING,
      so_luong: DataTypes.INTEGER,
      chuc_vu: DataTypes.STRING,
      job_type_code: DataTypes.STRING,
      salary_code: DataTypes.STRING,
      province_cong_viec: DataTypes.STRING,
      address_cong_viec: DataTypes.STRING,
      job_field_code: DataTypes.STRING,
      mo_ta: DataTypes.STRING,
      quyen_loi: DataTypes.STRING,
      // yeu cau cong viec
      degree_code: DataTypes.STRING,
      yeu_cau_cong_viec: DataTypes.TEXT,
      yeu_cau_ho_so: DataTypes.TEXT,
      deadline: DataTypes.DATE,
      id_employer: DataTypes.INTEGER,
      view_count: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Job",
    }
  );
  return Job;
};
