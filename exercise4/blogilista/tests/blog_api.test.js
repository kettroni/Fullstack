const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
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

beforeAll(async () => {
  await Blog.remove({})

  const blogObjects = initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api
    .get('/api/blogs')

  expect(response.body.length).toEqual(initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api
    .get('/api/blogs')

  const titles = response.body.map(r => r.title)

  expect(titles).toContainEqual('React patterns')
})

test('POST request saves and get returns updated list after', async () => {

  const beginning = await api.get('/api/blogs')

  const response = await api
    .post('/api/blogs')
    .send({
      title: "I AM A TEST",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7
    })

  const after = await api.get('/api/blogs')
  const titles = after.body.map(a => a.title)

  expect(titles).toContainEqual('I AM A TEST')
  expect(after.body.length).toBe(beginning.body.length + 1)
})

test('adding a blog with no value in likes assigns it to 0', async () => {

  const response = await api
    .post('/api/blogs')
    .send({
      title: "I AM A TEST",
      author: "Michael Chan",
      url: "https://reactpatterns.com/"
    })

  const after = await api.get('/api/blogs')
  const likes = after.body.map(a => a.likes)
  expect(likes).toContain(0)
})

test('adding a blog without title or url responses with status code 400 Bad request', async () => {

  const response = await api
    .post('/api/blogs')
    .send({
      author: "Some random dude",
      likes: "0"
    })

  expect(response.status).toBe(400)

})

afterAll(() => {
  server.close()
})
