import { randomUUID } from "crypto";
import { PATIENT_DATA } from "../data/patients";
import { Patient, NewPatient } from "../types";

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
  const newPatient: Patient = { ...patient, id: randomUUID() };
  PATIENT_DATA.push(newPatient);

  return newPatient;
};

export default {
  getPatients,
  getNonSensitivePatientData,
  addPatient,
  findById,
};
