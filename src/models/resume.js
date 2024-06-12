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
        targetKey: "id_ung_vien",
        as: "ungVienData",
      });
    }
  }
  Resume.init(
    {
      Resume_link: DataTypes.STRING,
      ung_vien_id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Resume",
    }
  );
  return Resume;
};
