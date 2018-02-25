const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const User = require('../models/user')

beforeAll(async () => {
  await User.remove({})
  await api.post('/api/users')
    .send({
      name: "Roni Kettunen",
	    username: "kettroni",
	    password: "213",
	    adult: true
    })
})


test("Adding a faulty user doesn't work", async() => {
  try {
    const before = await api.get('/api/users')
    const response = await api
      .post('/api/users')
      .send({username: 'Roni', password: '1'})

    const after = await api.get('/api/users')
    expect(after.body.length).toBe(before.body.length)
  } catch (exception) {

  }
})

test('When wrong input, gives correct response', async() => {
  try {
    const before = await api.get('/api/users')

    const response = await api
      .post('/api/users')
      .send({username: 'Roni', password: '1'})

    const after = await api.get('/api/users')
    expect(response.status).toBe(400)
  } catch (e) {

  }

})


afterAll(() => {
  server.close()
})
