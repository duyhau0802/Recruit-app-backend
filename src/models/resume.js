"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Resume extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Resume.belongsTo(models.Applicant, {
        foreignKey: "id_ung_vien",
        targetKey: "id",
        as: "ungVienData",
      });
    }
  }
  Resume.init(
    {
      cv_link: DataTypes.STRING,
      file_name: DataTypes.STRING,
      id_ung_vien: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Resume",
      timestamps: false,
    }
  );
  return Resume;
};
