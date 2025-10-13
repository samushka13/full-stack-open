import axios from "axios";
import type {
  DiaryEntry,
  NewDiaryEntry,
  NonSensitiveDiaryEntry,
} from "../types";

export const apiBaseUrl = "http://localhost:3000/api/diaries";

const getAll = async () => {
  const { data } = await axios.get<NonSensitiveDiaryEntry[]>(apiBaseUrl);

  return data;
};

const create = async (object: NewDiaryEntry) => {
  const { data } = await axios.post<DiaryEntry>(apiBaseUrl, object);

  const { comment, ...nonSensitiveData } = data;

  return nonSensitiveData;
};

export default { getAll, create };
