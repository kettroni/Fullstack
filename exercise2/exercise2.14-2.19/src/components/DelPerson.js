import personService from '../services/persons'

const DelPerson = (tama, id) => {
    return personService.remove(tama, id)
  }

  export default DelPerson
