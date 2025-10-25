import { Sequelize } from "sequelize";
import { Umzug, SequelizeStorage } from "umzug";

import { CONFIG } from "./config.js";

export const sequelize = new Sequelize(CONFIG.DB_DIRECT_URL, {});

const migrationConfig = {
  migrations: { glob: "migrations/*.js" },
  storage: new SequelizeStorage({ sequelize, tableName: "migrations" }),
  context: sequelize.getQueryInterface(),
  logger: console,
};

const runMigrations = async () => {
  const migrator = new Umzug(migrationConfig);
  const migrations = await migrator.up();
  console.log("Migrations up to date", {
    files: migrations.map((m) => m.name),
  });
};

export const connectToDB = async () => {
  try {
    await sequelize.authenticate();
    await runMigrations();
    console.log("connected to the database");
  } catch (e) {
    console.log("failed to connect to the database");
    return process.exit(1);
  }

  return null;
};

export const rollbackMigration = async () => {
  await sequelize.authenticate();
  const migrator = new Umzug(migrationConfig);
  await migrator.down();
};
