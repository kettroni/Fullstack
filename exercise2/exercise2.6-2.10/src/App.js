import React from 'react';
import Person from './components/Person'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas',
          number: '044-1234567'}
      ],
      newName: '',
      newNumber: '',
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

  Exists = () => {

    const result = this.state.persons.reduce((tulos, person) =>{
      if (tulos) {
        return tulos = true
      } else {
        return tulos = (person.name === this.state.newName)
      }
    }, false)
    return !result

  }

  addPerson = (event) => {
    event.preventDefault()
    if (this.Exists()) {

      const person = {
        name: this.state.newName,
        number: this.state.newNumber
      }

      const persons = this.state.persons.concat(person)

      this.setState({
        persons,
        newName: ''
      })
    } else {
      this.setState({
        newName: '',
        newNumber: ''
      })
    }

  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.addPerson}>
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
        <table>
            {this.state.persons.map(person=><Person key={person.name} henkilo={person}/>)}
        </table>
      </div>
    )
  }
}

export default App
