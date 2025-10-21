const router = require('express').Router()
const middleware = require('../utils/middleware')
const Blog = require('../models/blog')

router.get('/', async (_, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

router.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  blog ? response.json(blog) : response.status(404).end()
})

router.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ?? 0,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

router.put('/:id', async (request, response) => {
  const id = request.params.id
  const match = await Blog.findById(id)

  if (!match) {
    return response.status(404).end()
  }

  const blogToUpdate = {
    title: request.body.title ?? match.title,
    author: request.body.author ?? match.author,
    url: request.body.url ?? match.url,
    likes: request.body.likes ?? match.likes ?? 0
  }

  const updatedBlog = await Blog.findByIdAndUpdate(id, blogToUpdate)
  response.status(200).json(updatedBlog)
})

router.delete('/:id', middleware.userExtractor, async (request, response) => {
  const user = request.user

  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    response.status(404).end()
  }

  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  }
})

module.exports = router
