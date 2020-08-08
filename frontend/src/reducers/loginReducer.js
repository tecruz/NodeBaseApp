import loginService from '../services/login'
import blogService from '../services/blogs'
import { addNotification, removeNotification } from '../reducers/notificationReducer'

const initialState = { username:'', password:'', user:null }

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_USERNAME':
    return { ...state, username: action.data }
  case 'SET_PASSWORD':
    return { ...state, password: action.data }
  case 'SET_USER':
    return { ...state, user: action.data }
  case 'LOGIN':
    return { username: '', password:'', user: action.data }
  case 'LOGOUT':
    return { username: '', password:'', user: null }
  default:
    return state
  }
}

export const initializeUser = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    blogService.setToken(user.token)
    return {
      type: 'SET_USER',
      data: user
    }
  }

  return {
    type:''
  }
}

export const login = event => {
  event.preventDefault()
  return async (dispatch, getState) => {
    try {
      const { login } = getState()
      const username = login.username
      const password = login.password
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      dispatch({
        type: 'LOGIN',
        data: user
      })
    } catch (exception) {
      dispatch(addNotification('wrong credentials', 'error'))
      setTimeout(() => {
        dispatch(removeNotification())
      },5000)
    }
  }
}

export const logOut = () => {
  window.localStorage.removeItem('loggedBlogappUser')
  blogService.resetToken()
  return {
    type: 'LOGOUT'
  }
}

export const fieldChange = event => {
  const fieldName = event.target.name
  const value = event.target.value
  switch (fieldName) {
  case 'Username':
    return {
      type: 'SET_USERNAME',
      data: value
    }
  case 'Password':
    return {
      type: 'SET_PASSWORD',
      data: value
    }
  default:
    return {
      type:''
    }
  }
}

export default loginReducer