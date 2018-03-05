const VOTE = 'VOTE'
const CREATE = 'CREATE'
const SET_NOTIFICATION  = 'SET_NOTIFICATION'
const CLEAR = 'CLEAR'
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

function changeNotification(notification) {
  return {
    type: SET_NOTIFICATION,
    notification
  }
}

function clearNotification() {
  return {
    type: CLEAR
  }
}

export {addVote, createNew, changeNotification, clearNotification}
