import { DataTypes } from "sequelize";
import sequelizeConfig from "../sequelizeConnectDb.js";

const sequelize = sequelizeConfig;
const usersModel = sequelize.define(
  "users",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true, // Enforce email format
      },
    },
  },
  {
    freezeTableName: true,
  }
);
async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Connected to database");
  } catch (error) {
    console.error("Error connecting to database:", error);
    process.exit(1); // Exit the application if connection fails
  }
}
// connectToDatabase();

// console.log(sequelize.models.usersModel); // true

export default usersModel;
