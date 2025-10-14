import { Diagnosis } from "../types";
import DIAGNOSIS_DATA from "../data/diagnoses";

const getDiagnoses = (): Diagnosis[] => {
  return DIAGNOSIS_DATA;
};

export default { getDiagnoses };
