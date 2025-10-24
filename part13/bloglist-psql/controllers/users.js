import { Router } from "express";

import User from "../models/user.js";
import Blog from "../models/blog.js";

const userRouter = Router();

userRouter.get("/", async (_, res) => {
  const users = await User.findAll({
    include: { model: Blog, attributes: { exclude: ["userId"] } },
  });

  res.json(users);
});

userRouter.get("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);

  if (user) {
    res.json(user);
  } else {
    res.status(404).end();
  }
});

userRouter.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

userRouter.put("/:username", async (req, res) => {
  const user = await User.findByOne({
    where: { username: req.params.username },
  });

  if (user) {
    user.username = req.body.username;
    await user.save();
    res.json(user);
  } else {
    res.status(404).end();
  }
});

export default userRouter;
