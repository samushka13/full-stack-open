import express from "express";

import Blog from "./models/blog.js";
import CONFIG from "./utils/config.js";

const app = express();
app.use(express.json());

Blog.sync();

const baseUrl = "/api/blogs";

app.get(baseUrl, async (_, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

app.get(`${baseUrl}/:id`, async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);

  if (blog) {
    res.json(blog);
  } else {
    res.status(404).end();
  }
});

app.post(baseUrl, async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.json(blog);
  } catch (error) {
    res.status(400).json({ error });
  }
});

app.put(`${baseUrl}/:id`, async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);

  if (blog) {
    blog.likes = req.body.likes;
    await blog.save();
    res.json(blog);
  } else {
    res.status(404).end();
  }
});

app.delete(`${baseUrl}/:id`, async (req, res) => {
  try {
    await Blog.destroy({ where: { id: req.params.id } });
    res.status(204).end();
  } catch (error) {
    res.status(404).end();
  }
});

app.listen(CONFIG.PORT, () =>
  console.log(`Server running on port ${CONFIG.PORT}`)
);
