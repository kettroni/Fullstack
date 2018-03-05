import React from 'react'
import { connect } from 'react-redux'
import { notify } from '../reducers/actionCreators'
import { addVote } from '../services/anecdotes'
import Filter from './Filter'
class AnecdoteList extends React.Component {
  handleLike = async (anecdote) => {
    const temp = this.props
    console.log()
    temp.addVote(anecdote.id)
    temp.notify('you voted "' + anecdote.content + '"', 5000)
  }
  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter />
        <div>
          {this.props.anecdotesToShow.map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => {
                  this.handleLike(anecdote)
                }}>
                  vote
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

const filteredAnecdotes = (anecdotes, filter) => {
  try {
    return anecdotes
      .filter(a => a.content.toLowerCase().includes(filter))
      .sort((a, b) => b.votes - a.votes)
  } catch (e) {
    return anecdotes
  }

}

const mapStateToProps = (state) => {
  return {
    anecdotesToShow: filteredAnecdotes(state.anecdotes, state.filter)
  }
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  { addVote, notify },
)(AnecdoteList)

export default ConnectedAnecdoteList
