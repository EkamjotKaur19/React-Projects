const mongoose = require('mongoose')
mongoose.set('strictQuery', true)
const url ='mongodb+srv://ekamjot19:Ekamjot@cluster0.uyzqpki.mongodb.net/noteApp?retryWrites=true&w=majority'

console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const noteSchema = new mongoose.Schema({
  title:String,
  content: String,
  colors: String,
  searched:Boolean,
  file:String,
  pin:Boolean,
  date: Date,
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Note', noteSchema)