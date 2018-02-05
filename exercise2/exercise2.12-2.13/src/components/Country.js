import React from 'react'

const Country = (props) => {
    return (
        <div>
          <h1>{props.valtio.name}   {props.valtio.altSpellings[1]}</h1>
          <p>capital: {props.valtio.capital}</p>
          <p>population: {props.valtio.population}</p>
          <p><img  alt='Flag' witdth='200' height='100' src={props.valtio.flag}/></p>
        </div>
    )}
export default Country
