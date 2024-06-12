"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Save_job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Save_job.belongsTo(models.Applicant, {
        foreignKey: "id_ung_vien",
        targetKey: "id",
        as: "ungVienData",
      });
      Save_job.belongsTo(models.Job, {
        foreignKey: "id_tin",
        targetKey: "id",
        as: "jobData",
      });
    }
  }
  Save_job.init(
    {
      id_ung_vien: DataTypes.STRING,
      id_tin: DataTypes.STRING,
      createAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Save_job",
      updatedAt: false,
    }
  );
  return Save_job;
};
