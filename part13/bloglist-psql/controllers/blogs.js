import { Router } from "express";
import { Op } from "sequelize";

import { blogFinder } from "../middleware/blogFinder.js";
import { tokenExtractor } from "../middleware/tokenExtractor.js";
import { userFinder } from "../middleware/userFinder.js";

import Blog from "../models/blog.js";
import User from "../models/user.js";

const blogsRouter = Router();

blogsRouter.get("/", async (_, res) => {
  let where = {};

  if (req.query.search) {
    const queryString = `%${req.query.search.toLowerCase()}%`;

    where = {
      [Op.or]: [
        { title: { [Op.iLike]: queryString } },
        { author: { [Op.iLike]: queryString } },
      ],
    };
  }

  const blogs = await Blog.findAll({
    order: [["likes", "DESC"]],
    attributes: { exclude: ["userId"] },
    include: { model: User, attributes: ["name"] },
    where,
  });

  res.json(blogs);
});

blogsRouter.get("/:id", blogFinder, async (req, res) => {
  if (req.blog) {
    res.json(req.blog);
  } else {
    res.status(404).end();
  }
});

blogsRouter.post("/", [tokenExtractor, userFinder], async (req, res) => {
  try {
    const blog = await Blog.create({ ...req.body, userId: req.user.id });
    res.json(blog);
  } catch (error) {
    res.status(400).json({ error });
  }
});

blogsRouter.put("/:id", blogFinder, async (req, res) => {
  if (req.blog) {
    req.blog.likes = req.body.likes;
    await req.blog.save();
    res.json(req.blog);
  } else {
    res.status(404).end();
  }
});

blogsRouter.delete(
  "/:id",
  [blogFinder, tokenExtractor, userFinder],
  async (req, res) => {
    if (req.blog.userId === req.user.id) {
      await req.blog.destroy();
    }

    res.status(204).end();
  }
);

export default blogsRouter;
