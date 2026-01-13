import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Contacts from './components/Contacts'
import contactService from './services/contacts'
import Notification from './components/Notification'

const App = () => {
  const [contact, setContacts] = useState([])
  const [filteredArray, setFilteredArray] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    contactService.getAll().then(res => setContacts(res))
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

  const newArr = [...contact.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  )]
  setFilteredArray(newArr)
}

  const handleNotification = (message, error) => {
    setNotificationMessage(message)
    setIsError(error)
    setTimeout(() => {
        setIsError(false)
        setNotificationMessage(null)
      }, 5000)
  }

  const handleSubmit = e => {
    e.preventDefault()
    if(!newName || !newNumber) {
      handleNotification('Enter name and number', true)
      return
    }

    const existingContact = contact.find(person => person.name === newName)

    if(existingContact) {
      const revisedContact = {...existingContact, number: newNumber}
      contactService
      .updateContact(revisedContact.id, revisedContact)
      .then(res => {
        setContacts(prevContacts =>
          prevContacts.map(contact =>
            contact.id === res.id ? res : contact
          )
        )
      })
    } else {
      const newContact = {name: newName, number: newNumber}
      contactService.addContact(newContact).then(res => {
        setContacts(prevContacts => [...prevContacts, res])
      }).catch(error => {
        handleNotification(error.response.data.error, true)
      })
    }
  }

  const deleteContact = (id) => {
    console.log(id)
    const foundContact = contact.find(person => person.id === id)
    const confirmation = window.confirm(`Delete ${foundContact.name}`)

    if(confirmation) {
      contactService.removeContact(id).then(() => {
      setContacts(prevContacts =>
      prevContacts.filter(person => person.id !== id)
      )
      handleNotification(`${foundContact.name} has been removed`, false)
    }).catch(error => {
      handleNotification(error.response.data.error, true)
    })

    } else {
      return
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} error={isError}/>

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
      <Contacts filteredArray={filteredArray} contact={contact} deleteContact={deleteContact}/>
    </div>
  )
}

export default App