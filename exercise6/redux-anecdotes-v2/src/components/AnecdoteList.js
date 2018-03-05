import React from 'react'
import { connect } from 'react-redux'
import { addVote, changeNotification, clearNotification } from '../reducers/actionCreators'
import Filter from './Filter'
import AnecdoteService from '../services/anecdotes'
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
                <button onClick={async() => {
                  const temp = this.props
                  const it = await AnecdoteService.vote(anecdote.id)
                  return (
                    temp.addVote(it.id),
                    temp.changeNotification('you voted "' + it.content + '"'),
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
  { addVote, changeNotification, clearNotification },
)(AnecdoteList)

export default ConnectedAnecdoteList
