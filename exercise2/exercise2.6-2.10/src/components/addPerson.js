import Exists from './Exists'

const addPerson = (props) => {
    if (Exists(props.state)) {
      const person = {
        name: props.state.newName,
        number: props.state.newNumber
      }

      const persons = props.state.persons.concat(person)

      props.setState({
        persons,
        newName: '',
        newNumber: ''
      })
    } else {
      props.setState({
        newName: '',
        newNumber: ''
      })
    }

  }

  export default addPerson
