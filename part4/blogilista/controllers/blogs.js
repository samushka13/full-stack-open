const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (_, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  blog ? response.json(blog) : response.status(404).end()
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const match = await Blog.findById(id)

  if (!match) {
    return response.status(404).end()
  }

  const blogToUpdate = {
    title: request.body.title ?? match.title,
    author: request.body.author ?? match.author,
    url: request.body.url ?? match.url,
    likes: request.body.likes ?? match.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(id, blogToUpdate)
  response.status(200).json(updatedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter
