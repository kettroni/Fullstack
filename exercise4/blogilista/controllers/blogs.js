const blogsRouter = require('express').Router()

const Blog = require('../models/blog')

blogsRouter.get('', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('', async (request, response) => {
  const blog = new Blog(request.body)

  const store = await blog.save()
  response.status(201).json(store)
})

module.exports = blogsRouter
