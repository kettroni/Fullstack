import React from 'react'

const Yhteensa = (props) => {
  const palikat = props.kurssi.osat

  const lopullinen = palikat.reduce((summa, osa) => {
    return summa + osa.tehtavia
  }, 0)
  return (
    <p>yhteensa {lopullinen} tehtävää</p>
  )
}

export default Yhteensa
