import React from 'react'
import { createNew, changeNotification, clearNotification } from '../reducers/actionCreators'
class AnecdoteForm extends React.Component {
  handleSubmit = (e) => {
    const temp = this.props.store
    e.preventDefault()
    const content = e.target.anecdote.value
    temp.dispatch(createNew(content))
    temp.dispatch(changeNotification('added a new anecdote "' + content + '" successfully!'))
    e.target.anecdote.value = ''
    setTimeout(function(){temp.dispatch(clearNotification())}, 5000)
  }
  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote'/></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

export default AnecdoteForm
