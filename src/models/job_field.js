"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Job_field extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Job_field.init(
    {
      code: DataTypes.STRING,
      value: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Job_field",
    }
  );
  return Job_field;
};
