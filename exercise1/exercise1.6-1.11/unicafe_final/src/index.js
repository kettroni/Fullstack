import React from 'react';
import ReactDOM from 'react-dom';;

function kA (hyva, neutraali, huono) {
  return (hyva - huono)/(hyva + neutraali + huono)
}

function pos (hyva, neutraali, huono) {
  return (hyva/(hyva + neutraali + huono) * 100 + "%")
}

const Statistic = (props) => {
  return (
    <tr>
      <td>{props.taul[0]}			</td>
      <td>{props.taul[1]}</td>
    </tr>
  )
}

const Statistics = (props) => {
  return (
    <div>
      <table>
        <tbody>
          <Statistic taul={props.hyva}/>
          <Statistic taul={props.neutraali}/>
          <Statistic taul={props.huono}/>
          <Statistic taul={props.kA}/>
          <Statistic taul={props.pos}/>
        </tbody>
      </table>
    </div>
)
}
const Button = ({ handleClick, text }) => (
<button onClick={handleClick}>
  {text}
</button>
)

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      hyva: ['hyvä', 0],
      neutraali: ['neutraali', 0],
      huono: ['huono', 0],
      kA: ['keskiarvo', 0],
      pos: ['positiivisia', 0],
      onkoAnnettu: false,
    }


  }
  paivita() {
    this.setState((prevState) => ({kA: [prevState.kA[0], kA(prevState.hyva[1], prevState.neutraali[1], prevState.huono[1])],
    pos: [prevState.pos[0], pos(prevState.hyva[1], prevState.neutraali[1], prevState.huono[1])]}))
  }

  paina(param) {
    if(param === 'hyvä'){
      return (() => {this.setState((prevState) => ({hyva: [prevState.hyva[0], prevState.hyva[1] + 1],
      onkoAnnettu: true}))
      this.paivita()})
    } else if (param === 'neutraali') {
      return (() => {this.setState((prevState) => ({neutraali: [prevState.neutraali[0], prevState.neutraali[1] + 1],
      onkoAnnettu: true}))
      this.paivita()})
    } else if (param === 'huono') {
      return (() => {this.setState((prevState) => ({huono: [prevState.huono[0], prevState.huono[1] + 1],
      onkoAnnettu: true}))
      this.paivita()})
    } else {
      return console.log('Invalid param')
    }
  }


  render() {

    if (this.state.onkoAnnettu) {
    return (

    <div>
      <h1>anna palautetta</h1>
      <Button handleClick={this.paina('hyvä')}   text={this.state.hyva[0]}/>
      <Button handleClick={this.paina('neutraali')} text={this.state.neutraali[0]}/>
      <Button handleClick={this.paina('huono')} text={this.state.huono[0]}/>
      <h1>statistiikka</h1>
      <Statistics hyva={this.state.hyva} neutraali={this.state.neutraali} huono={this.state.huono}
      kA={this.state.kA} pos={this.state.pos}/>

    </div>

  )
  }else {
    return (
    <div>
      <h1>anna palautetta</h1>
      <Button handleClick={this.paina('hyvä')}   text={this.state.hyva[0]}/>
      <Button handleClick={this.paina('neutraali')} text={this.state.neutraali[0]}/>
      <Button handleClick={this.paina('huono')} text={this.state.huono[0]}/>
      <h1>statistiikka</h1>
      <p>ei yhtään palautetta annettu</p>
      </div>

    )
  }
}

}
ReactDOM.render(
  <App />,
  document.getElementById('root'))
