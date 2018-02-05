import React from 'react'

const Person = (props) => {

  if(props.henkilo.name.toLowerCase().indexOf(props.filter) !== -1) {
    return (
      <tr>
        <td>{props.henkilo.name}</td>
        <td>{props.henkilo.number}</td>
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
