const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')



usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
    .populate('blogs', {title: 1, author: 1, url: 1, likes: 1})

  const formatted = users.map(User.format)
  response.json(formatted)
})

usersRouter.post('/', async (request, response) => {

  const body = request.body

  try {
    if (!body.password || body.password.length < 3) {
      const err = 'Password must be longer than 3 characters!'
      response.status(400).json(err).end()
      throw err
    }
    const test = await User.find({username: body.username})
    if (test.length > 0) {
      const err = 'Username must be unique'
      response.status(400).json(err).end()
      throw err
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      adult: body.adult || true,
      passwordHash
    })

    const savedUser = await user.save()

    response.json(User.format(savedUser))
  } catch (exception) {
  }
})

module.exports = usersRouter
