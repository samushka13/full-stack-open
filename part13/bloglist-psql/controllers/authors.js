import { Router } from "express";

import Blog from "../models/blog.js";

const authorsRouter = Router();

authorsRouter.get("/", async (_, res) => {
  const attributes = [
    "author",
    [sequelize.fn("COUNT", sequelize.col("id")), "blogs"],
    [sequelize.fn("SUM", sequelize.col("likes")), "likes"],
  ];

  const authors = await Blog.findAll({ attributes, group: "author" });

  res.json(authors);
});

export default authorsRouter;
