const CountryInfo = ({countryInfo}) => {
  return (
    <div>
      <h1>{countryInfo.name.common}</h1>
      <p>Capital: {countryInfo.capital[0]}</p>
      <h2>Languages</h2>
      <ul>
        {Object.values(countryInfo.languages).map(lang => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={countryInfo.flags.png} alt={countryInfo.flags.alt} />
      <h2>Weather in {countryInfo.capital[0]}</h2>
      <p>Temperature {countryInfo.weather.main.temp} F</p>
      <img src={`https://openweathermap.org/img/wn/${countryInfo.weather.weather[0].icon}@2x.png`} alt={`${countryInfo.weather.weather[0].description} icon`} />
      <p>Wind {countryInfo.weather.wind.speed} MPH</p>
    </div>
  )
}

export default CountryInfo