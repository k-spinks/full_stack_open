require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Contact = require('./models/contact')
const app = express()

let persons = [
]

app.use(express.json())
app.use(morgan('tiny'))
morgan.token('post-body', (req) => {
  return JSON.stringify(req.body)
})

app.use(express.static('dist'))
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :post-body', {
    skip: (req) => req.method !== 'POST'
  })
)

app.get('/', (request, response) => {
  response.send('<h1>Hello World</h1>')
})

app.get('/api/persons', (request, response) => {
  Contact.find()
})

app.get('/info', (request, response) => {
  const totalContacts = persons.length
  const currentDate = new Date()
  response.send(`
    <p>Phone book has info for ${totalContacts} people </p>
    <p>${currentDate}</p>
    `)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => Number(n.id)))
    : 0
  return String(maxId + 1)
}

app.post('/api/persons', (request, response) => {
  const body = request.body
  console.log(body)

  if(!body.name) {
    return response.status(404).json({
      error: "Missing name"
    })
  }
  if(!body.number) {
    return response.status(404).json({
      error: "Missing number"
    })
  }

  if(persons.find(person => person.name.trim() === body.name.trim())) {
   return response.status(404).json({
      error: "Person already exists"
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId()
  }

  persons = persons.concat(person)
  response.json(person)
})

const PORT = 3001
app.listen(PORT)
console.log(`Listening on port: ${PORT}`)