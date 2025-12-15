const Contacts = ({filteredArray, persons, deleteContact}) => {
  return (
    <>
      {filteredArray.length > 0
        ? filteredArray.map(person => (
          <p key={person.id}>{person.name}: {person.number}
            <button onClick={() => deleteContact(person.id)}> Delete</button>
          </p>
        ))
        : persons.map(person => (
          <p key={person.id}>{person.name}: {person.number}
            <button onClick={() => deleteContact(person.id)}> Delete</button>
          </p>
        ))
      }
    </>
  )
}

export default Contacts