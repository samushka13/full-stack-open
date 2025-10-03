const { describe, test, after, beforeEach, before } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

let TOKEN = ''
let TEST_DATA = []

describe('when there are initial blogs', () => {
  before(async () => {
    await User.deleteMany({})

    const password = 'password'
    const passwordHash = await bcrypt.hash(password, 10)

    const newUser = new User({
      username: 'test-username',
      name: 'Test Name',
      passwordHash
    })

    await newUser.save()

    const user = await User.findOne({ username: newUser.username })

    const userForToken = {
      username: user.username,
      id: user._id,
    }

    TOKEN = jwt.sign(
      userForToken,
      process.env.SECRET,
      { expiresIn: 3600 }
    )

    TEST_DATA = helper.TEST_BLOGS.map((b) => ({ ...b, user: user._id.toString() }))
  })

  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(TEST_DATA)
  })

  test('succeeds with 200 if blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('succeeds with 200 if all blogs are returned', async () => {
    const response = await api.get('/api/blogs').expect(200)

    assert.strictEqual(response.body.length, helper.TEST_BLOGS.length)
  })

  test('succeeds with 200 if all blogs include "id"', async () => {
    const response = await api.get('/api/blogs').expect(200)

    const ids = response.body.flatMap((r) => Object.keys(r).filter((k) => k === 'id'))
    assert.strictEqual(ids.length, helper.TEST_BLOGS.length)
  })

  test('succeeds with 200 if a specific blog is among the returned blogs', async () => {
    const response = await api.get('/api/blogs').expect(200)

    const titles = response.body.map((r) => r.title)
    assert(titles.includes('React patterns'))
  })

  describe('GET blog', () => {
    test('succeeds with 200 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()

      const blogToView = {
        ...blogsAtStart[0],
        user: blogsAtStart[0].user.toString()
      }

      const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)


      assert.deepStrictEqual(resultBlog.body, blogToView)
    })

    test('fails with 404 if blog does not exist', async () => {
      const id = await helper.nonExistingId()

      await api.get(`/api/blogs/${id}`).expect(404)
    })

    test('fails with 400 if id is invalid', async () => {
      const id = '00000000000000000000000'

      await api.get(`/api/blogs/${id}`).expect(400)
    })
  })

  describe('POST blog', () => {
    test('succeeds with 201 if data is valid', async () => {
      const newBlog = {
        title: 'Test Blog',
        author: 'Test Username',
        url: 'http://localhost:3003/api/blogs/test-blog',
        likes: 1
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `Bearer ${TOKEN}`)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.TEST_BLOGS.length + 1)

      const titles = blogsAtEnd.map((r) => r.title)
      assert(titles.includes(newBlog.title))
    })

    test('succeeds with 201 if "likes" does not exist (set as 0)', async () => {
      const newBlog = {
        title: 'Test Blog With Default Likes Set As 0',
        author: 'Test Username',
        url: 'http://localhost:3003/api/blogs/test-blog',
      }

      const newBlogWithDefaultLikes = {
        ...newBlog,
        likes: undefined ?? 0,
      }

      await api
        .post('/api/blogs')
        .send(newBlogWithDefaultLikes)
        .set('Authorization', `Bearer ${TOKEN}`)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()

      const match = blogsAtEnd.find((r) => r.title === newBlog.title)
      assert.strictEqual(match.likes, 0)

      const likes = blogsAtEnd.map((r) => r.likes)
      assert(!likes.includes(undefined))
    })

    test('fails with 400 if "author" does not exist', async () => {
      const newBlog = {
        title: 'Test Blog',
        url: 'http://localhost:3003/api/blogs/test-blog',
        likes: 1
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `Bearer ${TOKEN}`)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.TEST_BLOGS.length)
    })

    test('fails with 400 if "url" does not exist', async () => {
      const newBlog = {
        title: 'Test Blog',
        author: 'Test Username',
        likes: 1
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `Bearer ${TOKEN}`)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.TEST_BLOGS.length)
    })

    test('fails with 400 if "token" does not exist', async () => {
      const newBlog = {
        title: 'Test Blog',
        author: 'Test Username',
        url: 'http://localhost:3003/api/blogs/test-blog',
        likes: 1
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', 'Bearer ')
        .expect(401)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.TEST_BLOGS.length)
    })
  })

  describe('PUT blog', () => {
    test('succeeds with 200 if data is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const id = blogsAtStart[0].id

      const blogToUpdate = {
        title: 'Updated Test Blog',
        author: blogsAtStart[0].author,
        url: blogsAtStart[0].url,
        likes: blogsAtStart[0].likes + 1
      }

      await api
        .put(`/api/blogs/${id}`)
        .send(blogToUpdate)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.TEST_BLOGS.length)

      const updatedBlog = blogsAtEnd.find((b) => b.id === id)
      assert.strictEqual(updatedBlog.title, blogToUpdate.title)
      assert.strictEqual(updatedBlog.likes, blogToUpdate.likes)
    })
  })

  describe('DELETE blog', () => {
    test('succeeds with 204 if a blog can be deleted', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]
      const id = blogToDelete.id

      await api
        .delete(`/api/blogs/${id}`)
        .set('Authorization', `Bearer ${TOKEN}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()
      const deletedBlog = blogsAtEnd.some((b) => b.id === id)

      assert(!deletedBlog)
      assert.strictEqual(blogsAtEnd.length, helper.TEST_BLOGS.length - 1)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})
