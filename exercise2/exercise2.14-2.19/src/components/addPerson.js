import Exists from './Exists'
import personService from '../services/persons'

const addPerson = (props) => {

    if (Exists(props.state)) {
      return personService.create({name: props.state.newName, number: props.state.newNumber}, props)
    } else {
      props.setState({
        newName: '',
        newNumber: '',
        searched: ''
      })
    }

  }

  export default addPerson
