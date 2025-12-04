const Contacts = ({filteredArray, persons}) => {
  return (
    <>
      {filteredArray.length > 0
        ? filteredArray.map(person => (
          <p key={person.id}>{person.name}: {person.number}</p>
        ))
        : persons.map(person => (
          <p key={person.id}>{person.name}: {person.number}</p>
        ))
      }
    </>
  )
}

export default Contacts