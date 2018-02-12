import axios from 'axios'
const baseUrl = 'https://blooming-basin-64505.herokuapp.com/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => { return response.data })
}

const create = (newObject, props) => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => {

    props.setState({
      persons: props.state.persons.concat(response.data),
      newName: '',
      newNumber: '',
      searched: ''
    })
  })
}

const remove = (props, id) => {
  const request = axios.delete(`${baseUrl}/${id}`)

  return request.then(response => {
    const temp = Number(id)
    props.setState({
      persons: props.state.persons.filter(person => person.id !== temp),
      newName: '',
      newNumber: '',
      searched: ''
    })
  })
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

export default { getAll, create, update, remove }
