import z from "zod";
import { NewPatientSchema } from "./utils/toNewPatientWithZod";

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
}

export type NewPatient = z.infer<typeof NewPatientSchema>;

export type PatientFormValues = Omit<Patient, "id" | "entries">;
