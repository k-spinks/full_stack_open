import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Contacts from './components/Contacts'
import contactService from './services/contacts'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filteredArray, setFilteredArray] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    contactService.getAll().then(res => setPersons(res))
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
    const newPerson = {
      name: newName.trim(),
      number: newNumber.trim(),
    }

    if(persons.find(person => person.name === newName.trim())) {
      const confirmation = window.confirm(`${newName} is already added to the phonebook, replace old number with new number?`)

      if(confirmation) {
        const oldContact = persons.find(person => person.name === newName)
        const newContact = {
          ...oldContact, number: newNumber.trim()
        }
        contactService.updateContact(newContact.id, newContact)
        .then(res => setPersons(persons.map(person => person.id === res.id ? {...person, number: res.number} : person)))
        setNewName('')
        setNewNumber('')
        return
      }
    }

    contactService.addContact(newPerson).then(res => setPersons(persons.concat(res)))
    setNewName('')
    setNewNumber('')
  }

  const deleteContact = (id) => {
    const contact = persons.find(person => person.id === id)
    const confirmation = window.confirm(`Delete ${contact.name}`)
    console.log(confirmation)
    if(confirmation) {
      contactService.removeContact(id)
      .then(res => setPersons(persons.filter(person => person.id !== res.id)))
    } else {
      return
    }
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
      <Contacts filteredArray={filteredArray} persons={persons} deleteContact={deleteContact}/>
    </div>
  )
}

export default App