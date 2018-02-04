import React from 'react'

const Kurssi = (props) => {
  const Otsikko = () => <h1>{props.kurssi.nimi}</h1>
  const osat = props.kurssi.osat
  const Yksittainen = (jotain) => <li>{jotain.nimi}     {jotain.numero}</li>

  return (
    <div>
      <Otsikko />
      <ul>
        {osat.map(osa=><Yksittainen key={osa.id} nimi={osa.nimi} numero={osa.tehtavia} />)}
      </ul>
    </div>


  )

}

export default Kurssi
