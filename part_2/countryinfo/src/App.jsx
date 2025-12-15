import { useState } from 'react'
import countryServices from './services/country'
import CountryInfo from './components/CountryInfo'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [countryInfo, setCountryInfo] = useState([])

  const handleChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const searchForCountries = (e) => {
    e.preventDefault()
    if(!searchTerm) {
      return
    }

    countryServices.getAllCountries(searchTerm).then(res => {
      if(res.error) {
        setErrorMessage(res.message)
      }else {
        setCountryInfo(res.data)
        setErrorMessage(null)
      }
    })
  }

  const showCountry = (countryName) => {
    countryServices.getCountry(countryName).then(res => {
      if(res.error) {
        setErrorMessage(res.message)
      }else {
        setCountryInfo([res.data])
        setErrorMessage(null)
      }
    })
  }


 return (
  <div>
    <form onSubmit={searchForCountries}>
      <label>Find a country</label>
      <input type="text" value={searchTerm} onChange={(e) => handleChange(e)}/>
      <p style={{color: "red"}}>{errorMessage}</p>
    </form>
    {countryInfo.length === 0 && ""}

    {countryInfo.length === 1 && <CountryInfo countryInfo={countryInfo[0]} />}

    {countryInfo.length > 1 && (
      <ul>
        {countryInfo.map(country => (
          <li key={country.name.common}>
            {country.name.common}
            <button onClick={() => showCountry(country.name.common)}>Show</button>
          </li>
        ))}
      </ul>
    )}
  </div>
 )
}

export default App


