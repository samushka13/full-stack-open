import * as z from "zod";

import { Gender } from "../types";

export const NewPatientSchema = z.object({
  name: z.string().trim().min(1),
  gender: z.enum(Gender),
  occupation: z.string().trim().min(1),
  dateOfBirth: z.string().optional(),
  ssn: z.string().optional(),
});
