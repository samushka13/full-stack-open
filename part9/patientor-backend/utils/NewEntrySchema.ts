import * as z from "zod";

import { EntryType, HealthCheckRating } from "../types";

// const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
//   if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
//     return [] as Array<Diagnosis["code"]>;
//   }

//   return object.diagnosisCodes as Array<Diagnosis["code"]>;
// };

const ENTRY_TYPES: EntryType[] = [
  "HealthCheck",
  "Hospital",
  "OccupationalHealthcare",
];

const SickLeaveSchema = z.object({
  startDate: z.string().trim().min(1),
  endDate: z.string().trim().min(1),
});

const DischargeSchema = z.object({
  date: z.string().trim().min(1),
  criteria: z.string().trim().min(1),
});

export const NewEntrySchema = z.object({
  type: z.literal(ENTRY_TYPES),
  description: z.string().trim().min(1),
  date: z.string().trim().min(1),
  specialist: z.string().trim().min(1),
  diagnosisCodes: z.array(z.string().trim().min(1)).optional(),
  healthCheckRating: z.enum(HealthCheckRating).optional(),
  discharge: DischargeSchema.optional(),
  employerName: z.string().optional(),
  sickLeave: SickLeaveSchema.optional(),
});
