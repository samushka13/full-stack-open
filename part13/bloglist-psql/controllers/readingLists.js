import { Router } from "express";
import { Op } from "sequelize";

import { currentUserValidator } from "../middleware/currentUserValidator.js";
import { readingListFinder } from "../middleware/readingListFinder.js";

import BlogList from "../models/blogList.js";
import ReadingList from "../models/readingList.js";

const readingListRouter = Router();

const middleware = [currentUserValidator, readingListFinder];

readingListRouter.post("/", middleware, async (req, res) => {
  let readingListId = req.readingList.id;

  if (!req.readingList) {
    const userId = req.body.user_id;
    const readingList = await ReadingList.create({ userId });
    readingListId = readingList.id;
  }

  const blogId = req.body.blog_id;
  const blogList = await BlogList.create({ blogId, readingListId });

  res.json(blogList);
});

readingListRouter.put("/:id", middleware, async (req, res) => {
  if (req.readingList) {
    const readingListId = req.readingList.id;
    const blogId = req.params.id;
    const where = { [Op.and]: { readingListId, blogId } };
    const bloglist = await BlogList.findOne({ where });

    if (bloglist) {
      bloglist.read = req.body.read;
      await bloglist.save();
      res.json(bloglist);
    } else {
      res.status(404).end();
    }
  }
});

export default readingListRouter;
