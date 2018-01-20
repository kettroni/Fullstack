import React from 'react';
import ReactDOM from 'react-dom';;

const Nayta = (props) => {
  return (<div>
    <p>{props.taul[0]} {props.taul[1]}</p>
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
      huono: ['huono', 0]
    }
  }

  render() {
    return (
    <div>
      <h1>anna palautetta</h1>
      <Button handleClick={() => {(this.setState({hyva: ['hyvä', this.state.hyva[1] + 1]}))}} text={this.state.hyva[0]}/>
      <Button handleClick={() => {(this.setState({neutraali: ['neutraali', this.state.neutraali[1] + 1]}))}} text={this.state.neutraali[0]}/>
      <Button handleClick={() => {(this.setState({huono: ['huono', this.state.huono[1] + 1]}))}} text={this.state.huono[0]}/>
      <h1>statistiikka</h1>
      <Nayta taul={this.state.hyva}/>
      <Nayta taul={this.state.neutraali}/>
      <Nayta taul={this.state.huono}/>

    </div>
  )
}

}
ReactDOM.render(
  <App />,
  document.getElementById('root'))
