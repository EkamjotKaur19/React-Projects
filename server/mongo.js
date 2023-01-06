const mongoose = require('mongoose')

mongoose.set('strictQuery', true)

const url = 'mongodb+srv://ekamjot19:Ekamjot@cluster0.uyzqpki.mongodb.net/noteApp?retryWrites=true&w=majority'

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

const Note = mongoose.model('Note', noteSchema);
console.log(url)
mongoose
  .connect(url)
  .then((result) => {
    console.log('connected')
  })
  .then(() => {
    console.log('note saved!')
    return mongoose.connection.close()
  })
  .catch((err) => console.log(err))

Note.find({}).then((result)=>{
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})