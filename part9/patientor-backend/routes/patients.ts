import express, { Request, Response } from "express";

import patientService from "../services/patientService";
import { NewPatient, Patient } from "../types";
import { errorMiddleware } from "../middleware/errorMiddleware";
import { newPatientParser } from "../middleware/newPatientParser";

const router = express.Router();

router.get("/", (_req, res: Response<Patient[]>) => {
  const data = patientService.getNonSensitivePatientData();
  res.send(data);
});

router.get("/:id", (req, res: Response<Patient>) => {
  const data = patientService.findById(req.params.id);
  res.send(data);
});

type PostReq = Request<unknown, unknown, NewPatient>;

router.post("/", newPatientParser, (req: PostReq, res: Response<Patient>) => {
  const addedPatient = patientService.addPatient(req.body);
  res.json(addedPatient);
});

router.use(errorMiddleware);

export default router;
