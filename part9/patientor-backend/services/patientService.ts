import { randomUUID } from "crypto";
import { PATIENT_DATA } from "../data/patients";
import {
  Patient,
  NewPatient,
  NewEntry,
  Entry,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
  BaseEntry,
} from "../types";

const getPatients = (): Patient[] => {
  return PATIENT_DATA;
};

const getNonSensitivePatientData = (): Omit<Patient, "ssn">[] => {
  return PATIENT_DATA.map(({ ssn, ...rest }) => rest);
};

const findById = (id: string): Patient | undefined => {
  const patient = PATIENT_DATA.find((d) => d.id === id);

  return patient;
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient: Patient = { ...patient, id: randomUUID(), entries: [] };
  PATIENT_DATA.push(newPatient);

  return newPatient;
};

const addEntry = (patientId: string, entry: NewEntry): Entry => {
  const newBaseEntry: BaseEntry = { ...entry, id: randomUUID() };
  const matchIdx = PATIENT_DATA.findIndex((p) => patientId === p.id);

  switch (entry.type) {
    case "HealthCheck": {
      const newEntry: HealthCheckEntry = {
        ...newBaseEntry,
        type: entry.type,
        healthCheckRating: entry.healthCheckRating,
      };
      PATIENT_DATA[matchIdx].entries.push(newEntry);
      return newEntry;
    }
    case "Hospital": {
      const newEntry: HospitalEntry = {
        ...newBaseEntry,
        type: entry.type,
        discharge: entry.discharge,
      };
      PATIENT_DATA[matchIdx].entries.push(newEntry);
      return newEntry;
    }
    case "OccupationalHealthcare": {
      const newEntry: OccupationalHealthcareEntry = {
        ...newBaseEntry,
        type: entry.type,
        employerName: entry.employerName,
        sickLeave: entry.sickLeave,
      };
      PATIENT_DATA[matchIdx].entries.push(newEntry);
      return newEntry;
    }
  }
};

export default {
  getPatients,
  getNonSensitivePatientData,
  findById,
  addPatient,
  addEntry,
};
