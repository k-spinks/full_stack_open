const Contacts = ({filteredArray, contact, deleteContact}) => {
  return (
    <>
      {filteredArray.length > 0
        ? filteredArray.map(person => (
          <p key={person.id}>{person.name}: {person.number}
            <button onClick={() => deleteContact(person.id)}> Delete</button>
          </p>
        ))
        : contact.map(person => (
          <p key={person.id}>{person.name}: {person.number}
            <button onClick={() => {
              console.log(person.id)
              deleteContact(person.id)
              }}> Delete</button>
          </p>
        ))
      }
    </>
  )
}

export default Contacts