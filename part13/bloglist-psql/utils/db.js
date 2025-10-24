import { Sequelize } from "sequelize";

import CONFIG from "./config.js";

const sequelize = new Sequelize(CONFIG.DB_DIRECT_URL, {});

export default sequelize;
