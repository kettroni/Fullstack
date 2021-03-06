import React from 'react'
import Note from './components/Note'
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      notes: [],
      newNote: ''
    }
    console.log('constructor')
  }

  eventHandler = (response) => {
    console.log('promise fulfilled')
    this.setState({notes: response.data})
  }

  promise = axios.get('http://localhost:3001/notes')

  componentDidMount() {
    console.log('will mount')
    this.promise.then(this.eventHandler)
  }

  addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: this.state.newNote,
      date: new Date().new,
      important: Math.random() > 0.5,
      id: this.state.notes.length + 1
    }

    const notes = this.state.notes.concat(noteObject)

    this.setState({
      notes: notes,
      newNote: ''
    })
  }

  handleNoteChange = (event) => {
    this.setState({newNote: event.target.value})
  }

  render() {
    console.log('render')
    return (
      <div>
        <h1>Muistiinpanot</h1>
        <ul>
          {this.state.notes.map(note=><Note key={note.id} note={note}/>)}
        </ul>
        <form onSubmit={this.addNote}>
          <input value={this.state.newNote} onChange={this.handleNoteChange}/>
          <button type='submit'>Tallenna</button>
        </form>
      </div>
    )
  }
}

export default App
