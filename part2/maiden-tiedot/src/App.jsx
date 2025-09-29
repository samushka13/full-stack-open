import { useState, useEffect } from 'react'
import countryService from './services/countries'

const Filter = ({ value, onChange, onReset }) => {
  return (
    <div>
      Find countries: <input onChange={onChange} value={value} />
      <button onClick={onReset}>Reset</button>
    </div>
  )
}

const Countries = ({ countries, onClick }) => {
  if (countries.length > 10)
    return <p>Too many matches – narrow your search</p>

  if (countries.length === 1)
    return <Country country={countries[0]} />

  return (
    <div>
      {countries.map((c) => (
        <div key={c.cca2}>
          <p>{c.name.common}</p>
          <button onClick={() => onClick(c.name.common)}>Show</button>
        </div>
      ))}
    </div>
  )
}

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null) 

  const capital = country.capital.length ? country.capital[0] : "-"

  const handleFetch = () => {
    country.latlng && countryService
      .getWeather(country.latlng)
      .then(setWeather)
  }

  useEffect(handleFetch, [country.latlng])

  return (
    <div>
        <h3>{country.flag} {country.name.common} {country.flag}</h3>

        <p>Capital: {capital}</p>
        <p>Area: {country.area ?? "-"}</p>

        <h3>Languages</h3>
        <ul>
          {Object.values(country.languages).map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>

        <img src={country.flags.png} />

        {weather && <>
          <h3>Weather in {capital}</h3>
          <p>🌡 Temperature: {weather.current.temperature_2m} °C</p>
          <p>🌥 Cloud cover: {weather.current.cloud_cover} %</p>
          <p>🌧 Rain: {weather.current.rain} mm</p>
          <p>🌨 Snowfall: {weather.current.snowfall} cm</p>
          <p>🌬 Wind: {weather.current.wind_speed_10m} m/s</p>
        </>}
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([]) 
  const [filterString, setFilterString] = useState('')

  const countriesToShow = filterString
    ? countries.filter((c) =>
        c.name.common.toLowerCase().includes(filterString.toLowerCase()) ||
        c.name.official.toLowerCase().includes(filterString.toLowerCase())
      )
    : countries

  const handleFilterChange = (event) => {
    setFilterString(event.target.value)
  }

  const handleFilterReset = () => {
    setFilterString('')
  }

  const handleDetailsFetch = (country) => {
    setFilterString(country)
  }

  const handleInitialFetch = () => {
    countryService
      .getAll()
      .then(setCountries)
  }

  useEffect(handleInitialFetch, [])

  return (
    <div>
      <h2>Country Search</h2>

      <Filter value={filterString} onChange={handleFilterChange} onReset={handleFilterReset} />

      <h3>Countries</h3>

      <Countries countries={countriesToShow} onClick={handleDetailsFetch} />
    </div>
  )

}

export default App
