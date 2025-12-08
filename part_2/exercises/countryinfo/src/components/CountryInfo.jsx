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
    </div>
  )
}

export default CountryInfo