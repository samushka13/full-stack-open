import express, { Request, Response } from "express";

import patientService from "../services/patientService";
import { Entry, NewEntry, NewPatient, Patient } from "../types";
import { errorMiddleware } from "../middleware/errorMiddleware";
import { newPatientParser } from "../middleware/newPatientParser";
import { newEntryParser } from "../middleware/newEntryParser";

const router = express.Router();

router.get("/", (_req, res: Response<Patient[]>) => {
  const data = patientService.getNonSensitivePatientData();
  res.send(data);
});

router.get("/:id", (req, res: Response<Patient>) => {
  const data = patientService.findById(req.params.id);
  res.send(data);
});

router.post(
  "/",
  newPatientParser,
  (
    req: Request<unknown, unknown, NewPatient>,
    res: Response<Patient | string>
  ) => {
    try {
      const addedPatient = patientService.addPatient(req.body);
      res.json(addedPatient);
    } catch (error: unknown) {
      let errorMessage = "Something went wrong.";

      if (error instanceof Error) {
        errorMessage += " Error: " + error.message;
      }

      res.status(400).send(errorMessage);
    }
  }
);

router.post(
  "/:id/entries",
  newEntryParser,
  (
    req: Request<{ id: string }, unknown, NewEntry>,
    res: Response<Entry | string>
  ) => {
    try {
      const addedEntry = patientService.addEntry(req.params.id, req.body);
      res.json(addedEntry);
    } catch (error: unknown) {
      let errorMessage = "Something went wrong.";

      if (error instanceof Error) {
        errorMessage += " Error: " + error.message;
      }

      res.status(400).send(errorMessage);
    }
  }
);

router.use(errorMiddleware);

export default router;
