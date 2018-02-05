const Exists = (props) => {

  const result = props.persons.reduce((tulos, person) =>{
    if (tulos) {
      return tulos = true
    } else {
      return tulos = (person.name === props.newName)
    }
  }, false)
  return !result
}

export default Exists
