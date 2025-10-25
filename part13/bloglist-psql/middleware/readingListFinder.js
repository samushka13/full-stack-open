import ReadingList from "../models/readingList.js";

export const readingListFinder = async (req, _, next) => {
  const where = { userId: req.body.user_id };
  req.readingList = await ReadingList.findOne({ where });
  next();
};
