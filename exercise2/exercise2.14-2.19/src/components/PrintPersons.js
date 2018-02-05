import React from 'react'
import Person from './Person'

const PrintPersons = (props) => {
  if (props.state.persons.length !== 0) {
    return(
      <table>
        <tbody>
          {props.state.persons.map(person=><Person key={person.name} filter={props.state.searched} henkilo={person}/>)}
        </tbody>
      </table>
    )
  } else {
    return (null)
  }

}

export default PrintPersons
