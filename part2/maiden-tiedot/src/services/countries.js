import axios from 'axios'

const BASE_URL = 'https://studies.cs.helsinki.fi/restcountries/api/'

const getAll = async () => {
  const request = await axios.get(BASE_URL + "all")
  return request.data
}

const getWeather = async (latlng) => {
  const lat = latlng[0]
  const lon = latlng[1]
  const params = 'temperature_2m,rain,snowfall,cloud_cover,wind_speed_10m'
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=${params}`
  const request = await axios.get(url)
  return request.data
}

export default { getAll, getWeather }
