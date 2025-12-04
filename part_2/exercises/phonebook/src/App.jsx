import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Contacts from './components/Contacts'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filteredArray, setFilteredArray] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(res => {
        setPersons(res.data)
      })
  },[])

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)

  }
  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleSearchSubmit = (e) => {
  e.preventDefault()
  if (!searchTerm) {
    alert('Please enter a search term')
    return
  }

  const newArr = [...persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  )]
  console.log(newArr)
  setFilteredArray(newArr)
}

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!newName || !newNumber) {
      alert('Please enter name and number')
      return
    }
    if(persons.find(name => name.name === newName.trim())) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    const newPerson = {
      name: newName.trim(),
      number: newNumber.trim(),
      id: persons.length + 1
    }
    setPersons([...persons, newPerson])
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter
        handleSearchSubmit={handleSearchSubmit}
        searchTerm={searchTerm}
        handleSearchTermChange={handleSearchTermChange}
      />
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Contacts filteredArray={filteredArray} persons={persons} />
    </div>
  )
}

export default App