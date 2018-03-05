import React from 'react'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'

class App extends React.Component {

  render() {
    return (
      <div>
        <h1>Programming anecdotes</h1>
        <h2>Anecdotes</h2>
        <Filter />
        <Notification />
        <AnecdoteList store={this.props.store}/>
        <AnecdoteForm/>
      </div>
    )
  }
}

export default App
