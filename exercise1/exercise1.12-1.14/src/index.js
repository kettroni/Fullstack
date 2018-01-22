import React from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => (
<button onClick={handleClick}>
  {text}
</button>
)

const Tulostus = (props) => {

  return (
    <div>
      <p>{props.a}</p>
      <p>has {props.b} votes</p>
    </div>
  )
}

const satunnainen = () => {
  var jokin = Math.floor(Math.random() * 6)
  return jokin
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      taul: [0, 0, 0, 0, 0, 0],
      max: 0
    }
  }

  paivita(prevState) {
    var apu = prevState.taul.slice()
    var max = apu.reduce(function(a, b)
     {return Math.max(a, b)})
    return ({max: apu.indexOf(max)})
  }

  lisaaAani(param) {
    var apu = this.state.taul.slice()
    apu[param] += 1
    this.setState({taul: apu})
    this.setState((prevState) => this.paivita(prevState))
  }

  render() {

    return (
      <div>
        <Tulostus a={this.props.anecdotes[this.state.selected]} b={this.state.taul[this.state.selected]}/>
        <p><Button handleClick={() => this.lisaaAani(this.state.selected)} text={'vote'}/>
        <Button handleClick={() => {this.setState({selected: satunnainen()})}} text={'next anecdote'}/></p>
        <h1>anecdote with most votes:</h1>
        <Tulostus a={this.props.anecdotes[this.state.max]} b={this.state.taul[this.state.max]}/>
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
