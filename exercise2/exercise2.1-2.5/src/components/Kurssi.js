import React from 'react'
import Yksittainen from './Yksittainen'
import Yhteensa from './Yhteensa'

const Kurssi = (props) => {
  const Otsikko = () => <h1>{props.kurssi.nimi}</h1>
  const osat = props.kurssi.osat
  return (
    <div>
      <Otsikko />
      <ul>
        {osat.map(osa=><Yksittainen key={osa.id} nimi={osa.nimi} numero={osa.tehtavia} />)}
      </ul>
      <Yhteensa kurssi={props.kurssi}/>
    </div>
  )
}

export default Kurssi
