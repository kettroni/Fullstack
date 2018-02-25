const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const {initialBlogs, testForPost, testPostNoLikes, testPostNoTitle, blogsInDb} = require('./test_helper')

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

  const blogs = await blogsInDb()
  expect(response.body.length).toEqual(blogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api
    .get('/api/blogs')

  const titles = response.body.map(r => r.title)

  expect(titles).toContainEqual('React patterns')
})

test('POST request saves and get returns updated list after', async () => {

  const beginning = await blogsInDb()

  const response = await api
    .post('/api/blogs')
    .send(testForPost)

  const after = await blogsInDb()
  const titles = after.map(a => a.title)

  expect(titles).toContainEqual('I AM A TEST')
  expect(after.length).toBe(beginning.length + 1)
})

test('adding a blog with no value in likes assigns it to 0', async () => {

  const response = await api
    .post('/api/blogs')
    .send(testPostNoLikes)

  const after = await blogsInDb()
  const likes = after.map(a => a.likes)
  expect(likes).toContain(0)
})

test('adding a blog without title or url responses with status code 400 Bad request', async () => {

  const response = await api
    .post('/api/blogs')
    .send(testPostNoTitle)

  expect(response.status).toBe(400)

})

afterAll(() => {
  server.close()
})
