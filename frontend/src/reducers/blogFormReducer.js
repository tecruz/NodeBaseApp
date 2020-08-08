const initialState = { title: '', author: '', url:'' }

const blogFormReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_TITLE':
    return { ...state, title: action.data }
  case 'SET_AUTHOR':
    return { ...state, author: action.data }
  case 'SET_URL':
    return { ...state, url: action.data }
  case 'RESET':
    return initialState
  default:
    return state
  }
}

export const fieldChange = event => {
  const id = event.target.id
  const value = event.target.value

  switch (id) {
  case 'fTitle':
    return {
      type: 'SET_TITLE',
      data: value
    }
  case 'fAuthor':
    return {
      type: 'SET_AUTHOR',
      data: value
    }
  case 'fUrl':
    return {
      type: 'SET_URL',
      data: value
    }
  default:
    return {
      type: ''
    }
  }
}

export const resetFields = () => {
  return {
    type: 'RESET'
  }
}

export default blogFormReducer

