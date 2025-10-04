const bcrypt = require('bcryptjs')
const router = require('express').Router()
const User = require('../models/user')

router.get('/', async (_, response) => {
  const users = await User.find({})
    .populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })

  response.json(users)
})

router.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (password.length < 3) {
    const error = 'password length must be at least 3 characters'
    return response.status(400).json({ error })
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

module.exports = router
