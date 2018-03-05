const initialState = 'No notifications'

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    case 'CLEAR':
      return initialState
    default:
      return state
  }
}

export const notificationChange = (notification) => {
  return {
    type: 'SET_NOTIFICATION',
    notification
  }
}

export const notificationClear = () => {
  return {
    type: 'CLEAR'
  }
}


export default notificationReducer
