const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5
  }
]

const testForPost = {
  title: "I AM A TEST",
  author: "Michael Chan",
  url: "https://reactpatterns.com/",
  likes: 7
}

const testPostNoLikes = {
  title: "I AM A TEST",
  author: "Michael Chan",
  url: "https://reactpatterns.com/"
}

const testPostNoTitle = {
    author: "Some random dude",
    likes: "0"
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(Blog.format)
}

module.exports = {
  initialBlogs, testForPost, testPostNoLikes, testPostNoTitle, blogsInDb
}
