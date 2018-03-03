const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', {username: 1, name: 1})

  response.json(blogs.map(Blog.format))
})

blogsRouter.post('', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
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
  try {
    const id = request.params.id
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    const user = await User.findById(decodedToken.id)
    const bleg = await Blog.findById(id)
  } catch (e) {
    response.status(401).json('You can only delete your own blogs!')
  }
  if (decodedToken.id === bleg.user.toString()) {
    const result = await Blog.findByIdAndRemove(id, (err) => {
      if (err) {
        return response.status(404).json('Not found')
      } else {
        return response.status(200).json('Successfully deleted')
      }
    })
  } else {
    response.status(401).json('You can only delete your own blogs!')
  }


})

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const temp = request.body


  const changes = {}
  if (temp.title) {
    changes['title'] = temp.title
  }
  if (temp.author) {
    changes['author'] = temp.author
  }
  if (temp.url) {
    changes['url'] = temp.url
  }
  if (temp.likes) {
    changes['likes'] = temp.likes
  }

  try {
    const found = await Blog.findByIdAndUpdate(id, changes, (err, raw) => {
      if (err) {
        response.status(404).json('Not found')
      } else {
        response.status(200).json('Updated ' + raw)
      }
    })
  } catch (e) {
    response.status(400).json('Wrong input')
  }
})

module.exports = blogsRouter
