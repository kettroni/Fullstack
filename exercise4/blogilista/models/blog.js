const mongoose = require('mongoose')


if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

let url = ''

if (process.env.NODE_ENV === 'test') {
  url = process.env.TEST_MONGODB_URI
} else {
  url = process.env.MONGODB_URI
}

mongoose.connect(url)

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

blogSchema.statics.format = function(blog) {
  if (blog.title && blog.url) {
    return {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes || 0,
      id: blog._id
    }
  } else {
    throw new Error()
  }

}

const Blog = mongoose.model('Blog', blogSchema)


module.exports = Blog
