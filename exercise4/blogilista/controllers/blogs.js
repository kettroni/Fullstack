const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.get('', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', {username: 1, name: 1})

  response.json(blogs.map(Blog.format))
})

blogsRouter.post('', async (request, response) => {
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const body = request.body
  const user = await User.findById(decodedToken.id)
  const blog = new Blog(body)
  blog.user = decodedToken.id
  try {
    const formatted = new Blog(Blog.format(blog))
    const store = await formatted.save()
    user.blogs = user.blogs.concat(store._id)
    await user.save()
    response.status(201).json(store)
  } catch (exception) {
      if (exception.name === 'JsonWebTokenError' ) {
        response.status(401).json({ error: exception.message })
      } else {
        response.status(400).end()
      }

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

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const temp = request.body
  const changes = {}
  if (temp.title) {
    changes['title'] = temp.title
  } else if (temp.author) {
    changes['author'] = temp.author
  } else if (temp.url) {
    changes['url'] = temp.url
  }

  try {
    const found = await Blog.findByIdAndUpdate(id, changes, (err) => {
      if (err) {
        response.status(404).json('Not found')
      } else {
        response.status(200).json('Updated')
      }
    })
  } catch (e) {
    response.status(400).json('Wrong input')
  }
})

module.exports = blogsRouter
