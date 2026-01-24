// Import mongoose
const mongoose = require('mongoose')

// Creates mongoose schema for a blog
const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  user: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
})

// Removes v id and id from returned objects
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)