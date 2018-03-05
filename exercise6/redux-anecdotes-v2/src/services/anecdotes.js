import axios from 'axios'

const getAll = async () => {
  const response = await axios.get('http://localhost:3001/anecdotes')
  return response.data
}

const add = async (newObject) => {
  const response = await axios.post('http://localhost:3001/anecdotes', { content: newObject, votes: 0 })
  return response.data
}

export default { getAll, add }
