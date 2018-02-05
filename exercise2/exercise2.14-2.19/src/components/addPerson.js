import Exists from './Exists'
import axios from 'axios'

const addPerson = (props) => {

    if (Exists(props.state)) {

      axios
        .post('http://localhost:3001/persons', {
          name: props.state.newName,
          number: props.state.newNumber
        })
          .then(response => {
              props.setState({
                  persons: props.state.persons.concat(response.data),
                  newName: '',
                  newNumber: '',
                  searched: ''
              })
          })
    } else {
      props.setState({
        newName: '',
        newNumber: ''
      })
    }

  }

  export default addPerson
