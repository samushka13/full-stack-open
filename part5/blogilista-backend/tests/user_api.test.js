const { describe, test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcryptjs')
const app = require('../app')
const helper = require('./test_helper')
const User = require('../models/user')

const api = supertest(app)

describe('when there is one initial user', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('password', 10)

    const user = new User({
      username: 'initial-test-user',
      name: 'Initial Test User',
      passwordHash
    })

    await user.save()
  })

  test('POST succeeds with 201 if username is unique', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'new-test-user',
      name: 'New Test User',
      password: 'newtestpassword',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })

  test('POST fails with 400 if username is not unique', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'initial-test-user',
      name: 'Initial Test User Duplicate',
      password: 'password',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()

    assert(result.body.error.includes('expected `username` to be unique'))
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('POST fails with 400 if username is not long enough', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'yo',
      name: 'You Should Not See Me',
      password: 'password',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('POST fails with 400 if password is not long enough', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'you-should-not-see-me',
      name: 'You Should Not See Me',
      password: 'pa',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})

