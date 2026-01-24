const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

// POST route for logging in a user
loginRouter.post('/', async (request, response) => {

  // Get username and password form the body
  const { username, password } = request.body

  // Look for the user in the db
  const user = await User.findOne({ username })

  // If there is a user we check if the password and passwordHash are the same
  const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash)


  // If there is no user or password doesn't match return error
  if(!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  // creating a new token with the username and the id of the user from the db
  const userForToken = {
    username: user.username,
    id: user._id
  }

  // jwt token
  const token = jwt.sign(userForToken, process.env.SECRET)

  // Return successful and send token with username and name
  response.status(200).send({ token, username: user.username, name: user.name })

})

module.exports = loginRouter