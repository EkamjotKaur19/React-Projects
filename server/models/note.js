const mongoose = require('mongoose')
mongoose.set('strictQuery', true)


const noteSchema = new mongoose.Schema({
  title:String,
  content: String,
  colors: String,
  searched:Boolean,
  file:String,
  pin:Boolean,
  date: Date,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Note', noteSchema)