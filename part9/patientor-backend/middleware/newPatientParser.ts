import { Request, Response, NextFunction } from "express";
import { NewPatientSchema } from "../utils/toNewPatientWithZod";

export const newPatientParser = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    NewPatientSchema.parse(req.body);
    console.log(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};
