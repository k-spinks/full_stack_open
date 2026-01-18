const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')

// Creates new instance of express app
const app = express()

// Attempts to connect to db
console.log(`Connecting to : ${config.MONGODB_URI}`)

mongoose.connect(config.MONGODB_URI, { family: 4 })
  .then(result => {
    logger.info('Connected to mongodb')
  })
  .catch(error => {
    logger.error('Failed to connect to MongoDB', error.message)
  })


app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/blogs', blogsRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app