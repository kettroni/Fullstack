import React from 'react'
import Person from './Person'

const PrintPersons = (props) => {
  return(
    <table>
      <tbody>
        {props.state.persons.map(person=><Person filter={props.state.searched} key={person.name} henkilo={person}/>)}
      </tbody>
    </table>
  )
}

export default PrintPersons
