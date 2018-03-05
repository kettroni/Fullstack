const anecdotesAtStart = []

const asObject = (anecdote) => {
  return {
    content: anecdote.content,
    id: anecdote.id,
    votes: anecdote.votes
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (store = initialState, action) => {
  if (action.type==='VOTE') {
    const old = store.filter(a => a.id !==action.id)
    const voted = store.find(a => a.id === action.id)

    return [...old, { ...voted, votes: voted.votes+1 } ]
  }
  if (action.type === 'CREATE_ANEC') {
    return [...store, action.data]
  }
  if (action.type === 'INIT_ANEC') {
    return action.data
  }

  return store
}

export const anecInitialization = (data) => {
  return {
    type: 'INIT_ANEC',
    data
  }
}

export default reducer
