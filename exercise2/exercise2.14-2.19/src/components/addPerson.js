import personService from '../services/persons'

const addPerson = (props) => {
      return personService.create({name: props.state.newName, number: props.state.newNumber}, props)
  }

  export default addPerson
