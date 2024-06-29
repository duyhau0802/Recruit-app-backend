"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Saved_job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Saved_job.belongsTo(models.Applicant, {
        foreignKey: "id_ung_vien",
        targetKey: "id",
        as: "ungVienData",
      });
      Saved_job.belongsTo(models.Job, {
        foreignKey: "id_tin",
        targetKey: "id",
        as: "jobData",
      });
    }
  }
  Saved_job.init(
    {
      id_ung_vien: DataTypes.STRING,
      id_tin: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Saved_job",
      updatedAt: false,
    }
  );
  return Saved_job;
};
