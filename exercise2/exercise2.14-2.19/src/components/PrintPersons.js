import React from 'react'
import Person from './Person'

const PrintPersons = (props) => {
    return(
      <table>
        <tbody>
          {props.tama.state.persons.map(person=><Person key={person.name} tama={props.tama} filter={props.tama.state.searched} henkilo={person}/>)}
        </tbody>
      </table>
    )
}

export default PrintPersons
