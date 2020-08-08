import React from 'react'
import { login } from '../reducers/loginReducer'
import { useDispatch, useSelector } from 'react-redux'
import { fieldChange } from '../reducers/loginReducer'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const LoginForm = () => {
  const dispatch = useDispatch()

  const username = useSelector(state => state.login.username)
  const password = useSelector(state => state.login.password)

  return(
    <form onSubmit={event => dispatch(login(event))}>
      <div>
        <TextField
          id='username'
          type="text"
          value={username}
          name="Username"
          label="Username"
          onChange={event => dispatch(fieldChange(event))}
        />
      </div>
      <div>
        <TextField
          id='password'
          type="password"
          value={password}
          name="Password"
          label="Password"
          onChange={event => dispatch(fieldChange(event))}
        />
      </div>
      <Button id='login-button' variant="contained" color="primary" type="submit">login</Button>
    </form>
  )
}

export default LoginForm