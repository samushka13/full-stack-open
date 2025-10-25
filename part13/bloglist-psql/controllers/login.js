import { Router } from "express";
import jwt from "jsonwebtoken";

import { CONFIG } from "../utils/config.js";
import User from "../models/user.js";
import Session from "../models/session.js";

const HARDCODED_PASSWORD = "secret";

const router = Router();

router.post("/", async (req, res) => {
  const user = await User.findOne({ where: { username: req.body.username } });
  const isPasswordCorrect = req.body.password === HARDCODED_PASSWORD;

  if (!(user && isPasswordCorrect)) {
    return res.status(401).json({ error: "invalid username or password" });
  }

  if (user.disabled) {
    return res.status(401).json({ error: "disabled user" });
  }

  const userForToken = { username: user.username, id: user.id };
  const token = jwt.sign(userForToken, CONFIG.SECRET);

  await Session.create({ token, userId: user.id });

  res.status(200).send({ token, username: user.username, name: user.name });
});

export default router;
