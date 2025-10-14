import { Request, Response, NextFunction } from "express";
import { NewEntrySchema } from "../utils/NewEntrySchema";

export const newEntryParser = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    NewEntrySchema.parse(req.body);
    console.log(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};
