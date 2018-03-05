const SET_NOTIFICATION  = 'SET_NOTIFICATION'
const CLEAR = 'CLEAR'
const SET_FILTER = 'SET_FILTER'

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
export { changeNotification, clearNotification, changeFilter }
