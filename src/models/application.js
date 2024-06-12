"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Applications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Applications.belongsTo(models.Applicant, {
        foreignKey: "id_ung_vien",
        targetKey: "id_ung_vien",
        as: "ungVienData",
      });
      Applications.belongsTo(models.Job, {
        foreignKey: "id_tin",
        targetKey: "id_tin",
        as: "jobData",
      });
      Applications.belongsTo(models.Employer, {
        foreignKey: "id_employer",
        targetKey: "id_employer",
        as: "employerData",
      });
    }
  }
  Applications.init(
    {
      id_ung_vien: DataTypes.STRING,
      id_tin: DataTypes.STRING,
      id_employer: DataTypes.STRING,
      time_apply: DataTypes.DATE,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Applications",
    }
  );
  return Applications;
};
