import axios from 'axios'

const url = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(url)
  return response.data
}

const add = async (newObject) => {
  const response = await axios.post(url, { content: newObject, votes: 0 })
  return response.data
}

const remove = async (id) => {
  const response = await axios.delete(url + `/${id}`)
  return response.data
}

const vote = async (id) => {
  const temp = await getAll()

  const filtered = temp.filter((a) => a.id === id)

  filtered[0].votes++

  const response = await axios.put(url + `/${id}` , filtered[0])
  return response.data

}

export default { getAll, add, vote, remove }
