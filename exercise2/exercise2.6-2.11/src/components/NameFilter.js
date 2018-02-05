import React from 'react'

const nameFilter = (props) => {
  return(
      <p>rajaa näytettäviä <input value={props.state.searched} onChange={props.updateSearched}/></p>
  )
}

export default nameFilter
