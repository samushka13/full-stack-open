import { Router } from "express";
import { Op } from "sequelize";

import { blogFinder } from "../middleware/blogFinder.js";
import { currentUserValidator } from "../middleware/currentUserValidator.js";

import Blog from "../models/blog.js";
import User from "../models/user.js";

const blogsRouter = Router();

blogsRouter.get("/", async (req, res) => {
  try {
    let where = {};

    if (req.query.search) {
      const queryString = `%${req.query.search.toLowerCase()}%`;
      const op = { [Op.iLike]: queryString };
      where = { [Op.or]: [{ title: op }, { author: op }] };
    }

    const blogs = await Blog.findAll({
      order: [["likes", "DESC"]],
      attributes: { exclude: ["userId"] },
      include: { model: User, attributes: ["name"] },
      where,
    });

    res.json(blogs);
  } catch (e) {
    if (e.toString().includes("is not associated to")) {
      const blogs = await Blog.findAll();
      return res.json(blogs);
    }

    return res.status(400).json({ error: "blogs could not be fetched" });
  }
});

blogsRouter.get("/:id", blogFinder, async (req, res) => {
  if (req.blog) {
    res.json(req.blog);
  } else {
    res.status(404).end();
  }
});

blogsRouter.post("/", currentUserValidator, async (req, res) => {
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
  [blogFinder, currentUserValidator],
  async (req, res) => {
    if (req.blog.userId === req.user.id) {
      await req.blog.destroy();
    }

    res.status(204).end();
  }
);

export default blogsRouter;
