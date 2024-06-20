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
      Resume.belongsTo(models.User, {
        foreignKey: "id_user",
        targetKey: "id",
        as: "userData",
      });
    }
  }
  Resume.init(
    {
      cv_link: DataTypes.STRING,
      file_name: DataTypes.STRING,
      id_user: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Resume",
      timestamps: false,
    }
  );
  return Resume;
};
