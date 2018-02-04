import React from 'react'

const Person = (props) => {
  return (
    <tr>
      <td>{props.henkilo.name}</td>
      <td>{props.henkilo.number}</td>
    </tr>
  )
}

export default Person
