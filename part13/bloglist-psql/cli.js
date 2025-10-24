import { Sequelize, QueryTypes } from "sequelize";
import "dotenv/config.js";

const sequelize = new Sequelize(process.env.DB_DIRECT_URL, {});

const main = async () => {
  try {
    const query = "SELECT * FROM blogs";
    const blogs = await sequelize.query(query, { type: QueryTypes.SELECT });

    blogs.forEach((b) =>
      console.log(`${b.author}: '${b.title}', ${b.likes} likes`)
    );

    sequelize.close();
  } catch (e) {
    console.error("Unable to connect to the database:", e);
  }
};

main();
