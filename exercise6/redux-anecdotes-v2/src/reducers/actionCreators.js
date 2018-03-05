const SET_NOTIFICATION  = 'SET_NOTIFICATION'
const CLEAR = 'CLEAR'
const SET_FILTER = 'SET_FILTER'

export const notify = (notification, timer) => {
  return async (dispatch) => {
    dispatch({
      type: SET_NOTIFICATION,
      notification
    })
    setTimeout(() => {
      dispatch({
        type: CLEAR
      })
    }, timer)
  }
}

function changeFilter(filter) {
  return {
    type: SET_FILTER,
    filter
  }
}
export { changeFilter }
