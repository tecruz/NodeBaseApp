const initialState = []

const togglableReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'INIT_VIEW':
    return [...state, action.data]
  case 'TOGGLE':
    return state.map(view => view.id !== action.data.id ? view : { ...view, visibility: !view.visibility })
  default:
    return state
  }
}

export const toggleVisibility = id => {
  return {
    type: 'TOGGLE',
    data: { id }
  }
}

export const initializeView = id => {
  return {
    type: 'INIT_VIEW',
    data: {
      id,
      visibility: false
    }
  }
}

export default togglableReducer

