import axios from 'axios'

const BASE_URL = 'http://localhost:3001/persons'

const getAll = async () => {
  const request = await axios.get(BASE_URL)
  return request.data
}

const create = async (newPerson) => {
  const request = await axios.post(BASE_URL, newPerson)
  return request.data
}

const update = async (id, newPerson) => {
  const request = await axios.put(`${BASE_URL}/${id}`, newPerson)
  return request.data
}

const remove = async (id) => {
  const request = await axios.delete(`${BASE_URL}/${id}`)
  return request.data
}

export default { getAll, create, update, remove }
