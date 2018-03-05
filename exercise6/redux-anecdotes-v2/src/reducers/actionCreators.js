const VOTE = 'VOTE'
const CREATE = 'CREATE'
const SET_NOTIFICATION  = 'SET_NOTIFICATION'
const CLEAR = 'CLEAR'
const SET_FILTER = 'SET_FILTER'
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

function changeFilter(filter) {
  return {
    type: SET_FILTER,
    filter
  }
}

export {addVote, createNew, changeNotification, clearNotification, changeFilter}
