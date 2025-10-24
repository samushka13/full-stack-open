import Blog from "../models/blog.js";

export const blogFinder = async (req, _, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};
