import { Router } from "express";
import { Sequelize } from "sequelize";

import Blog from "../models/blog.js";

const authorsRouter = Router();

authorsRouter.get("/", async (_, res) => {
  const attributes = [
    "author",
    [Sequelize.fn("COUNT", Sequelize.col("id")), "blogs"],
    [Sequelize.fn("SUM", Sequelize.col("likes")), "likes"],
  ];

  const authors = await Blog.findAll({ attributes, group: "author" });

  res.json(authors);
});

export default authorsRouter;
