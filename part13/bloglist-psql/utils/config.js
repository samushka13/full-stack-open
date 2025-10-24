import "dotenv/config.js";

export const CONFIG = {
  DB_NAME: process.env.DB_NAME,
  DB_URL: process.env.DB_URL,
  DB_KEY: process.env.DB_KEY,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_DIRECT_URL: process.env.DB_DIRECT_URL,
  SECRET: process.env.SECRET,
  PORT: process.env.PORT || 3001,
};
