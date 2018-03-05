import React from 'react'
import { addVote, changeNotification, clearNotification } from '../reducers/actionCreators'
class AnecdoteList extends React.Component {
  render() {
    return (
      <div>
        <div>
          {this.props.store.getState().anecdotes.filter(a => a.content.toLowerCase().includes(this.props.store.getState().filter)).sort((a, b) => b.votes - a.votes).map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => {
                  const temp = this.props.store
                  return (
                    temp.dispatch(addVote(anecdote.id)),
                    temp.dispatch(changeNotification('you voted "' + anecdote.content + '"')),
                    setTimeout(function(){temp.dispatch(clearNotification())}, 5000)
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

export default AnecdoteList
