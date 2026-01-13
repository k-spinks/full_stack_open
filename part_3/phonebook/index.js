require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Contact = require('./models/contact')

// Creates instance of express app
const app = express()

// Function to handle CastErrors
const errorHandler = (error, request, response, next) => {
  console.log(error)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }else if(error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }

  next(error)
}

// Middleware to server front end, parse request body and morgan logger
app.use(express.static('dist'))
app.use(express.json())
app.use(morgan('tiny'))

morgan.token('post-body', (req) => {
  return JSON.stringify(req.body)
})


app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :post-body', {
    skip: (req) => req.method !== 'POST'
  })
)

// Backup route if no front end is found from previous middleware
app.get('/', (request, response) => {
  response.send('<h1>Hello World</h1>')
})

// GET route for all contacts
app.get('/api/persons', (request, response) => {
  Contact.find({}).then(contact => {
    response.json(contact)
  })
})

// GET route to retrieve how many contacts are in the db
app.get('/api/info', (request, response) => {
  Contact.find({}).then(contacts => {
    const totalContacts = contacts.length
    const currentDate = new Date()

    response.send(`
      <p>Phonebook has info for ${totalContacts} people</p>
      <p>${currentDate}</p>
    `)
  })
})

// GET route to find a specific contact by ID
app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id

  Contact.findById(id).then(result => {
    if(result) {
      response.json(result)
    } else {
      response.status(404).end()
    }
  }).catch(error => {
    next(error)
  })
})


// DELETE route to remove a contact based on ID
app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  Contact.findByIdAndDelete(id).then(result => {
    response.status(204).end()
  }).catch(error => {
    response.status(204)
  })
})


// PUT route to update an existing route based on ID
app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body
  Contact.findById(request.params.id).then(contact => {

    if(!contact) {
      response.status(404).end()
    }

    contact.name = name
    contact.number = number

    contact.save().then(newContact => {
      console.log(newContact)
      response.json(newContact)
    })
  }).catch(error => next(error))
})


// POST route to add a new contact
app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if(!body.name) {
    return response.status(404).json({
      error: 'Missing name'
    })
  }
  if(!body.number) {
    return response.status(404).json({
      error: 'Missing number'
    })
  }

  const contact = new Contact({
    name: body.name,
    number: body.number,
  })

  contact.save().then(savedContact => {
    response.json(savedContact)
  }).catch(error => next(error))

})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// Middleware to handle unknown endpoints
app.use(unknownEndpoint)
// Middleware to catch errors
app.use(errorHandler)

const PORT = 3001
app.listen(PORT)
console.log(`Listening on port: ${PORT}`)