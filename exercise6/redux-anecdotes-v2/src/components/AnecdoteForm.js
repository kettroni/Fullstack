import React from 'react'
import { connect } from 'react-redux'
import { createNew, changeNotification, clearNotification } from '../reducers/actionCreators'
class AnecdoteForm extends React.Component {
  handleSubmit = (e) => {
    const temp = this.props
    e.preventDefault()
    const content = e.target.anecdote.value
    temp.createNew(content)
    temp.changeNotification('added a new anecdote "' + content + '" successfully!')
    e.target.anecdote.value = ''
    setTimeout(function(){temp.clearNotification()}, 5000)
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes
  }
}

const ConnectedAnecdoteForm = connect(
  mapStateToProps,
  { createNew, changeNotification, clearNotification },
)(AnecdoteForm)

export default ConnectedAnecdoteForm
