const initialState = { message: null, type: null }

const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
  case 'SHOW':
    return { message:action.message, type: action.msgType }
  case 'HIDE':
    return initialState
  default:
    return state
  }
}


export const addNotification = (msg, msgType) => {
  return {
    type: 'SHOW',
    message: msg,
    msgType
  }
}

export const removeNotification = () => {
  return {
    type: 'HIDE'
  }
}

export default notificationReducer

