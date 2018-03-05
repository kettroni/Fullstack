import React from 'react'
import { connect } from 'react-redux'
import { addVote, changeNotification, clearNotification } from '../reducers/actionCreators'
import Filter from './Filter'
class AnecdoteList extends React.Component {
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
                  const temp = this.props
                  return (
                    temp.addVote(anecdote.id),
                    temp.changeNotification('you voted "' + anecdote.content + '"'),
                    setTimeout(function(){temp.clearNotification()}, 5000)
                  )}
                }>
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
  return anecdotes
    .filter(a => a.content.toLowerCase().includes(filter))
    .sort((a, b) => b.votes - a.votes)
}

const mapStateToProps = (state) => {
  return {
    anecdotesToShow: filteredAnecdotes(state.anecdotes, state.filter)
  }
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  { addVote, changeNotification, clearNotification },
)(AnecdoteList)

export default ConnectedAnecdoteList
