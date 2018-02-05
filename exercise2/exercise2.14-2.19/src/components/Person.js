import React from 'react'
import DelPerson from '../components/DelPerson'
const Person = (props) => {

    if(props.henkilo.name.toLowerCase().indexOf(props.filter) !== -1) {
      return (
        <tr>
          <td>{props.henkilo.name}</td>
          <td>{props.henkilo.number}</td>
          <td>
            <button type="submit" id={props.henkilo.id} onClick={(event) => {
              event.preventDefault()
              return(
                DelPerson(props.tama, event.target.id)
            )}}>
              Poista
            </button>
          </td>
        </tr>
      )
    } else {
      return (
        <tr>
        </tr>
      )
    }

}

export default Person
