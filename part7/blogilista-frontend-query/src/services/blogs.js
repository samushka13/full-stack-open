import axios from "axios";

const BASE_URL = "/api/blogs";

let TOKEN = null;

const setToken = (newToken) => {
  TOKEN = `Bearer ${newToken}`;
};

const getAll = async () => {
  const request = await axios.get(BASE_URL);
  return request.data;
};

const create = async (blog) => {
  const config = { headers: { Authorization: TOKEN } };
  const response = await axios.post(BASE_URL, blog, config);
  return response.data;
};

const update = async (blog) => {
  const request = await axios.put(`${BASE_URL}/${blog.id}`, blog);
  return request.data;
};

const remove = async (blog) => {
  const config = { headers: { Authorization: TOKEN } };
  const request = await axios.delete(`${BASE_URL}/${blog.id}`, config);
  return request.data;
};

export default { getAll, create, update, remove, setToken };
