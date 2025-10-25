import { Router } from "express";

import User from "../models/user.js";
import Blog from "../models/blog.js";
import ReadingList from "../models/readingList.js";

const userRouter = Router();

userRouter.get("/", async (_, res) => {
  try {
    const include = { model: Blog, attributes: { exclude: ["userId"] } };
    const users = await User.findAll({ include });
    res.json(users);
  } catch (e) {
    if (e.toString().includes("is not associated to")) {
      const users = await User.findAll();
      return res.json(users);
    }

    res.status(400).json({ error: "users could not be fetched" });
  }
});

userRouter.get("/:id", async (req, res) => {
  try {
    const read = req.query.read;
    const where = typeof read === "boolean" ? { read } : {};

    const user = await User.findByPk(req.params.id, {
      attributes: ["username", "name"],
      include: [
        {
          model: ReadingList,
          attributes: ["userId"],
          include: {
            model: Blog,
            as: "readings",
            attributes: ["author", "title", "url", "likes", "year"],
            through: { attributes: ["read", "id"], where },
          },
        },
      ],
    });

    user && res.json(user);
  } catch (e) {
    if (e.toString().includes("is not associated to")) {
      const user = await User.findByPk(req.params.id);
      return res.json(user);
    }
  }

  res.status(404).end();
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
  const where = { username: req.params.username };
  const user = await User.findByOne({ where });

  if (user) {
    user.username = req.body.username;
    await user.save();
    res.json(user);
  } else {
    res.status(404).end();
  }
});

export default userRouter;
