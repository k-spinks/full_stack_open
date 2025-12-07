import axios from "axios";
const baseURL = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseURL)
  return request.then(res => res.data)
}

const addContact = newContact => {
  const request = axios.post(baseURL, newContact)
  return request.then(res => res.data)
}

const removeContact = id => {
  const deleteURL = `${baseURL}/${id}`
  const request = axios.delete(deleteURL)
  return request.then(res => res.data)
}

const updateContact = (id, newContact) => {
  const updateURL = `${baseURL}/${id}`
  const request = axios.put(updateURL, newContact)
  return request.then(res => res.data)
}

export default { getAll, addContact, removeContact, updateContact }