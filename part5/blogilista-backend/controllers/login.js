const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const router = require('express').Router()
const User = require('../models/user')

router.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })

  const isPasswordCorrect =
    user !== null && await bcrypt.compare(password, user.passwordHash)

  if (!(user && isPasswordCorrect)) {
    return response.status(401).json({ error: 'invalid username or password' })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(
    userForToken,
    process.env.SECRET,
    { expiresIn: 3600 }
  )

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = router
