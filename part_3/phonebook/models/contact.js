const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

mongoose.connect(url, { family: 4 })
  .then(result => {
    console.log('Connected to mongodb')
  })
  .catch(error => {
    console.log('Failed to connect to mongodb', error.message)
  })

const contactSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: [3, 'must be at least 3 characters'],
    required: [true, 'Name is required']
  },
  number: {
    type: String,
    minLength: [8, 'must be at least 8 characters'],
    validate: {
      validator: function(v) {
        return /\d{2,3}-\d/.test(v)
      },
      message: number => `${number.value} invalid number format`
    },
    required: [true, 'Number is required']
  }
})

contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Contact', contactSchema)
