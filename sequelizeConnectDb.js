import dbConfig from "./src/config/dbConfig.js";
import Sequelize from "sequelize";

const sequelizeConfig = new Sequelize(
  dbConfig.MYSQL_DATABASE,
  dbConfig.MYSQL_USER,
  dbConfig.MYSQL_PASSWORD,
  {
    host: dbConfig.MYSQL_HOST,
    dialect: dbConfig.DIALECT,
    logging: false,
  }
);

async function connectToDatabase() {
  try {
    await sequelizeConfig.authenticate();
    console.log("Connected to database successfully");
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
}

connectToDatabase();

export default sequelizeConfig;
