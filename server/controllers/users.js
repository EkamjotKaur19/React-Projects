const bcrypt = require('bcrypt');
const usersRouter = require('express').Router()
const User = require('../models/user')
const Notes = require('../models/note')


usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('notes', { content: 1, date: 1 });

  response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
  const id = request.params.id
  console.log(id)
  const user = await User.findById(id)
  const noteIds = user.notes
  console.log(noteIds)
  let noteList=[];
  for(let i=0; i<noteIds.length; i++){
    await Notes
    .findById(noteIds[i])
    .then(note=>  {if(note!==null) noteList.push(note)})
}
console.log(noteList)
response.json(noteList)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter