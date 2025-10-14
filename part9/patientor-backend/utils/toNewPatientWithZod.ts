import { NewPatient } from "../types";
import { NewPatientSchema } from "./NewPatientSchema";

export const toNewPatientWithZod = (object: unknown): NewPatient => {
  return NewPatientSchema.parse(object);
};
