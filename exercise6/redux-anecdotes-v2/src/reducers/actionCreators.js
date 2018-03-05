const VOTE = 'VOTE'
const CREATE = 'CREATE'

function addVote(params) {
  return {
    type: VOTE,
    id: params
  }
}

function createNew(content) {
  return {
    type: CREATE,
    content
  }
}

export {addVote, createNew}
