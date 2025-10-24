import User from "../models/user.js";

export const userFinder = async (req, _, next) => {
  req.user = await User.findByPk(req.decodedToken.id);
  next();
};
