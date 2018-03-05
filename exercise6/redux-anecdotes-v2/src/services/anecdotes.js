import axios from 'axios'

const url = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(url)
  return response.data
}

export const addVote = (id) => {
  return async (dispatch) => {
    const response = await axios.get(url + `/${id}`)
    const temp = response.data
    temp.votes++
    await axios.put(url + `/${id}` , temp)
    dispatch({
      type: 'VOTE',
      id: temp.id
    })
  }
}

export const anecInitialization = () => {
  return async (dispatch) => {
    const anecdotes = await getAll()
    dispatch({
      type: 'INIT_ANEC',
      data: anecdotes
    })
  }
}

export const add = (newObject) => {
  return async (dispatch) => {
    const response = await axios.post(url, { content: newObject, votes: 0 })
    dispatch({
      type: 'CREATE_ANEC',
      data: response.data
    })
  }
}

const remove = async (id) => {
  const response = await axios.delete(url + `/${id}`)
  return response.data
}

export default { getAll, remove }
