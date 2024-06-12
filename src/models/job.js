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
        foreignKey: "linh_vuc_hoat_dong",
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
        targetKey: "id_employer",
        as: "employerData",
      });
    }
  }
  Job.init(
    {
      vi_tri: DataTypes.SRING,
      so_luong: DataTypes.INTERGER,
      chuc_vu: DataTypes.SRING,
      job_type_code: DataTypes.SRING,
      salary_code: DataTypes.SRING,
      province_cong_viec: DataTypes.SRING,
      address_cong_viec: DataTypes.SRING,
      job_field_code: DataTypes.SRING,
      mo_ta: DataTypes.SRING,
      quyen_loi: DataTypes.SRING,
      degree_code: DataTypes.SRING,
      yeu_cau_cong_viec: DataTypes.TEXT,
      yeu_cau_ho_so: DataTypes.TEXT,
      deadline: DataTypes.DATE,
      ngay_dang: DataTypes.DATE,
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
