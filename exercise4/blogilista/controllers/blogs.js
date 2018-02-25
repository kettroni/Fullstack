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

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id

  const result = await Blog.findByIdAndRemove(id, (err) => {
    if (err) {
      return response.status(404).json('Not found')
    } else {
      return response.status(200).json('Successfully deleted')
    }
  })
})

module.exports = blogsRouter
