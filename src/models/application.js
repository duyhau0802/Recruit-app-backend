"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Application extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Application.belongsTo(models.Applicant, {
        foreignKey: "id_ung_vien",
        targetKey: "id",
        as: "ungVienData",
      });
      Application.belongsTo(models.Job, {
        foreignKey: "id_tin",
        targetKey: "id",

        as: "jobData",
      });
      Application.belongsTo(models.Employer, {
        foreignKey: "id_employer",
        targetKey: "id",
        as: "employerData",
      });
      Application.belongsTo(models.Resume, {
        foreignKey: "id_resume",
        targetKey: "id",
        as: "resumeData",
      });
    }
  }
  Application.init(
    {
      id_ung_vien: DataTypes.INTEGER,
      id_tin: DataTypes.INTEGER,
      id_employer: DataTypes.INTEGER,
      id_resume: DataTypes.INTEGER,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Application",
      updatedAt: false,
    }
  );
  return Application;
};
