import { Router } from "express";

import { currentUserValidator } from "../middleware/currentUserValidator.js";

import Session from "../models/session.js";

const sessionRouter = Router();

sessionRouter.delete("/", currentUserValidator, async (req, res) => {
  if (req.user) {
    await Session.destroy({ where: { user_id: req.user.id } });
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

export default sessionRouter;
