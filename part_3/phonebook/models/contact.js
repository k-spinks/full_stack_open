const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url, { family: 4 })
  .then(result => {
    console.log('Connected to mongodb')
  })
  .catch(error => {
    console.log('Failed to connect to mongodb', error.message)
  })

const contactSchema = mongoose.Schema({
  name: String,
  number: String
})

contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Contact', contactSchema)
