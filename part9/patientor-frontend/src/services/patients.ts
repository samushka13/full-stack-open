import axios from "axios";
import { Entry, NewEntry, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const getById = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const addEntry = async (patientId: string, object: NewEntry) => {
  const path = `${apiBaseUrl}/patients/${patientId}/entries`;
  const { data } = await axios.post<Entry>(path, object);

  return data;
};

export default { getAll, getById, create, addEntry };
