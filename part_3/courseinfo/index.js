require('dotenv').config()
const express = require('express')
const Note = require('./models/note')

// Creates express instance
const app = express()

// Logger for endpoints when hit
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

// Error handler middleware
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if(error.name === 'ValidationError'){
    return response.status(404).send({ error: error.message })
  }

  next(error)
}

app.use(express.static('dist'))
app.use(express.json())
app.use(requestLogger)

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

// Route which returns all notes
app.get('/api/notes', (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes)
  })
})

// Route which returns a single note
app.get('/api/notes/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note)
      } else {

        // If no note is found return 404 not found error
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

// Add a new note
app.post('/api/notes', (request, response, next) => {
  const body = request.body

  // If request does not have a body return an error
  if (!body.content) {
    return response.status(400).json({ error: 'content missing' })
  }

  // Create a new note with Note object schema
  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  // Save note to database
  note.save().then((savedNote) => {
    response.json(savedNote)
  })
  .catch(error => next(error))
})

// Update note in database
app.put('/api/notes/:id', (request, response, next) => {
  // Destructor content and important status from body
  const { content, important } = request.body

  // Find note in db
  Note.findById(request.params.id)
    .then((note) => {
      if (!note) {
        return response.status(404).end()
      }

      // update note information
      note.content = content
      note.important = important

      // Save updated note
      return note.save().then((updatedNote) => {
        response.json(updatedNote)
      })
    })
    .catch((error) => next(error))
})

// Delete note in db
app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

// Handle unknown endpoints
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// Middleware for unknown endpoint and errorHandler
app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})