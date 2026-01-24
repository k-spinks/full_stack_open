const { default: mongoose } = require('mongoose')
const User = require('mongoose')

// Creates user schema which references blog ids
const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  passwordHash: String,
  blogs: [
    {
      // References to another document
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

module.exports = mongoose.model('User', userSchema)
