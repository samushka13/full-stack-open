import jwt from "jsonwebtoken";

import { CONFIG } from "../utils/config.js";

import User from "../models/user.js";
import Session from "../models/session.js";

export const currentUserValidator = async (req, res, next) => {
  req.user = null;
  req.token = null;
  req.decodedToken = null;

  const authorization = req.get("authorization");

  if (authorization) {
    req.token = authorization.startsWith("Bearer ")
      ? authorization.substring(7)
      : authorization;
  } else {
    return res.status(401).json({ error: "missing token" });
  }

  const session = await Session.findOne({ where: { token: req.token } });
  const isSessionValid = session !== null;

  if (isSessionValid) {
    try {
      req.decodedToken = jwt.verify(req.token, CONFIG.SECRET);
    } catch {
      return res.status(401).json({ error: "invalid token" });
    }
  }

  if (req.decodedToken.id) {
    req.user = await User.findByPk(req.decodedToken.id);
  }

  if (!req.user) {
    return res.status(401).json({ error: "unknown user" });
  }

  if (req.user.disabled) {
    await Session.destroy({ where: { user_id: req.user.id } });
  }

  next();
};
