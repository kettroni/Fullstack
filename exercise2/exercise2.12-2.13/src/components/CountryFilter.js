import React from 'react'
import Country from './Country'

const CountryFilter = (props) => {
  const list = props.state.countries.filter(country=> {
    return (country.name.toLowerCase().indexOf(props.state.searched) !== -1)
  })
  if (list.length > 10) {
    return <p>too many matches, specify another filter</p>
  } else if (list.length < 1) {
    return <p>no matches!</p>
  } else if (list.length === 1) {
    return <Country valtio={list[0]}/>
  } else {
    return (
      list.map((country) => {
        return (
          <div key={country.name} onClick={() => props.tama.setState({searched: country.name.toLowerCase()})}>
            {country.name}
          </div>
        )
      } )
    )
  }
}


export default CountryFilter
