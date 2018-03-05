const VOTE = 'VOTE'
const CREATE = 'CREATE_ANEC'
const SET_NOTIFICATION  = 'SET_NOTIFICATION'
const CLEAR = 'CLEAR'
const SET_FILTER = 'SET_FILTER'
function addVote(params) {
  return {
    type: VOTE,
    id: params
  }
}

export const createNew = (data) => {
  return {
    type: CREATE,
    data
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

export { addVote, changeNotification, clearNotification, changeFilter }
