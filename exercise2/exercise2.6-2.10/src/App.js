import React from 'react';
import Person from './components/Person'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas' }
      ],
      newName: ''
    }
  }

  updateName = (event) => {
    this.setState({
      newName: event.target.value
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
        name: this.state.newName
      }

      const persons = this.state.persons.concat(person)

      this.setState({
        persons,
        newName: ''
      })
    } else {
      this.setState({
        newName: ''
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
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <ul>
          {this.state.persons.map(person=><Person key={person.name} henkilo={person}/>)}
        </ul>
      </div>
    )
  }
}

export default App
