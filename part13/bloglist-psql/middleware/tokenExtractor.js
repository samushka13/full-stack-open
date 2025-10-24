import { CONFIG } from "../utils/config.js";

export const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");

  if (authorization && authorization.startsWith("Bearer ")) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), CONFIG.SECRET);
    } catch {
      return res.status(401).json({ error: "invalid token" });
    }
  } else {
    return res.status(401).json({ error: "missing token" });
  }

  next();
};
