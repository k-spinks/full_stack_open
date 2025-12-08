import axios from "axios";
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/'
// const weatherURL = 'https://api.openweathermap.org/data/2.5/weather?'
// const weatherURL = 'http://api.openweathermap.org/geo/1.0/direct'
const weatherURL = 'https://api.openweathermap.org/data/2.5/onecall'
const API_KEY = import.meta.env.VITE_API_KEY

const getCountry = (searchTerm) => {
  return axios.get(`${baseUrl}/name/${searchTerm}`)
  .then(res =>{
    const [lat, lng] = res.data.latlng
    const weatherRes = axios.get(`${weatherURL}?lat=${lat}&lon=${lng}&exclude=minutely,hourly,daily,alerts&appid=${API_KEY}`)
    weatherRes.then(res => console.log(res))

    return {error: false, data: res.data, message: 'Success'}
  }).catch(error => {
    return {error: true, data: null, message: `Error: ${error}`}
  })
}

const getAllCountries = (searchTerm) => {
  return axios.get(`${baseUrl}/all`)
    .then(res => {
      const filteredArray = res.data.filter(country =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      )

      if (filteredArray.length === 0) {
        return {error: true, data: null, message: 'No matches found'}
      }

      if (filteredArray.length > 10) {
        return {error: true, data: null, message: 'Too many matches, specify another filter'}
      }

      if (filteredArray.length === 1) {
        return getCountry(filteredArray[0].name.common)
          .then(res => {
            return res.error ? res : { ...res, data: [res.data] }
          })
      }

      return {error: false, data: filteredArray, message: 'Success'}
    })
    .catch(error => ({error: true, data: null, message: `Error: ${error}`}))
}


export default { getCountry, getAllCountries }