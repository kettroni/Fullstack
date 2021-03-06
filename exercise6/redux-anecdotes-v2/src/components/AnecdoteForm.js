import React from 'react'
import { connect } from 'react-redux'
import { notify } from '../reducers/actionCreators'
import { add } from '../services/anecdotes'


class AnecdoteForm extends React.Component {

  handleSubmit = async(e) => {
    const temp = this.props
    e.preventDefault()
    const content = e.target.anecdote.value
    temp.add(content)
    temp.notify('added a new anecdote "' + content + '" successfully!', 5000)
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
  { add, notify },
)(AnecdoteForm)

export default ConnectedAnecdoteForm
