const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {url: 1, title: 1, author: 1})

  response.json(users)
})

// POST route for creating a new user
usersRouter.post('/', async (request, response) => {
  // Grab data from the request body
  const { username, name, password } = request.body

  // Check if username and password are included in request
  if(!username || !password) {
    return response.status(400).json({ error: `${!username ? 'Username' : 'Password'} is required`})
  }

  // Check if username and password are at least 3 characters
  if (username.length < 3 || password.length < 3) {
    return response.status(400).json({ error: `${username.length < 3 ? 'Username' : 'Password'} must be at least 3 characters`})
  }

  // Check to make sure usernames are unique
  const foundUser = await User.findOne({ username: username })
  if(foundUser) {
    return response.status(400).json({ error: 'Username must be unique'})
  }

  const saltRounds = 10

  // Encrypt password and saves hashed version to db
  const passwordHash = await bcrypt.hash(password, saltRounds)

  // Create a new user with user schema
  const user = new User({
    username,
    name,
    passwordHash
  })

  // save new user and respond
  const savedUser = await user.save()
  response.status(201).json(savedUser)
})


module.exports = usersRouter