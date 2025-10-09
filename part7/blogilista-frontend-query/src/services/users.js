import axios from "axios";

const BASE_URL = "/api/users";

const getAll = async () => {
  const request = await axios.get(BASE_URL);
  return request.data;
};

export default { getAll };
