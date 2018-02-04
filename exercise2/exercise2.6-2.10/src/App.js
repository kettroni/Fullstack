import React from 'react';
import addPerson from './components/addPerson'
import NameFilter from './components/NameFilter'
import PrintPersons from './components/PrintPersons'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number: '044-1234567'},
        { name: 'Martti Tienari', number: '040-123456' },
        { name: 'Arto Järvinen', number: '040-123456' },
        { name: 'Lea Kutvonen', number: '040-123456' }
      ],
      newName: '',
      newNumber: '',
      searched: '',
    }
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
        <PrintPersons state={this.state}/>
      </div>
    )
  }
}

export default App
