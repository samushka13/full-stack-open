import * as z from "zod";

import { Gender, NewPatient } from "../types";

export const NewPatientSchema = z.object({
  name: z.string(),
  gender: z.enum(Gender),
  occupation: z.string(),
  dateOfBirth: z.string().optional(),
  ssn: z.string().optional(),
});

export const toNewPatientWithZod = (object: unknown): NewPatient => {
  return NewPatientSchema.parse(object);
};
