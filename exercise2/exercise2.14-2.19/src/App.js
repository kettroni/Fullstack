import React from 'react'
import addPerson from './components/addPerson'
import NameFilter from './components/NameFilter'
import PrintPersons from './components/PrintPersons'
import personService from './services/persons'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      searched: '',
    }
  }

  eventHandler = (response) => {
    this.setState({persons: response.data})
  }

  componentWillMount() {
    personService.getAll().then(this.eventHandler)
  }

  updateName = (event) => {
    this.setState({
      newName: event.target.value
    })
  }

  updateNumber = (event) => {
    this.setState({
      newNumber: event.target.value
    })
  }

  updateSearched = (event) => {
    this.setState({
      searched: event.target.value
    })
  }

  add = (event) => {
    event.preventDefault()
    addPerson(this)
  }

  render() {

    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <div>
          <NameFilter state={this.state} updateSearched={this.updateSearched}/>
        </div>
        <h2>Lisää uusi</h2>
        <form onSubmit={this.add}>
          <div>
            nimi: <input value={this.state.newName} onChange={this.updateName}/>
            <p></p>
            numero: <input value={this.state.newNumber} onChange={this.updateNumber}/>
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
          <PrintPersons tama={this}/>
      </div>
    )
  }
}

export default App
