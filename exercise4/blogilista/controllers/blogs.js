const blogsRouter = require('express').Router()

const Blog = require('../models/blog')

blogsRouter.get('', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('', async (request, response) => {

  const blog = new Blog(request.body)
  try{
    const formatted = new Blog(Blog.format(blog))
    const store = await formatted.save()
    response.status(201).json(store)
  } catch (exception) {
    response.status(400).end()
  }
})

module.exports = blogsRouter
