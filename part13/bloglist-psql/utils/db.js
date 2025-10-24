import { Sequelize } from "sequelize";

import { CONFIG } from "./config.js";

export const sequelize = new Sequelize(CONFIG.DB_DIRECT_URL, {});

export const connectToDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("connected to the database");
  } catch (e) {
    console.log("failed to connect to the database");
    return process.exit(1);
  }

  return null;
};
