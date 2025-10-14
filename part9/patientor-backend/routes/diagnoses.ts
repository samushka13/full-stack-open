import express, { Response } from "express";

import diagnosisService from "../services/diagnosisService";
import { Diagnosis } from "../types";
import { errorMiddleware } from "../middleware/errorMiddleware";

const router = express.Router();

router.get("/", (_req, res: Response<Diagnosis[]>) => {
  const data = diagnosisService.getDiagnoses();
  res.send(data);
});

router.use(errorMiddleware);

export default router;
