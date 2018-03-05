import React from 'react'
import { connect } from 'react-redux'
import { addVote, changeNotification, clearNotification } from '../reducers/actionCreators'
class AnecdoteList extends React.Component {
  render() {
    return (
      <div>
        <div>
          {this.props.anecdotes.filter(a => a.content.toLowerCase().includes(this.props.filter)).sort((a, b) => b.votes - a.votes).map(anecdote =>
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

const mapStateToProps = (state) => {
  return {
    filter: state.filter,
    anecdotes: state.anecdotes
  }
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  { addVote, changeNotification, clearNotification },
)(AnecdoteList)

export default ConnectedAnecdoteList
