const mongoose = require('mongoose')

// Checks if the cmd line arguments are less than 3 and exits
if (process.argv.length < 2) {
  console.log('give password as argument')
  process.exit(1)
}

// Sets the 3rd argument to the password
const password = process.argv[2]

const url = `mongodb+srv://kspinks_db_user:${password}@cluster0.jsiurff.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

// Connects using IPv4
mongoose.connect(url, { family: 4 })

// Creates db schema
const contactSchema = mongoose.Schema({
  name: String,
  number: String
})

// Creates a new model with the predefined schema
const Contact = mongoose.model('Contact', contactSchema)


// If the cmd line arguments is exactly 3, fetch all documents from the collection
if(process.argv.length === 3) {
  Contact.find({}).then(result => {
    console.log('Phonebook: ')
    result.forEach(contact => {
      console.log(`${contact.name} ${contact.number}`)
    })
    mongoose.connection.close()
  })
}

// If the cmd line arguments is 4, save new contact
if(process.argv.length > 3) {
  const newName = process.argv[3]
  const newNumber = process.argv[4]

  const newContact = new Contact({
    name: newName,
    number: newNumber
  })

  newContact.save().then(result => {
    console.log(`added ${newName} number ${newNumber} to phonebook`)
    mongoose.connection.close()
  })
}
