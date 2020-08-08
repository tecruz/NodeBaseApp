import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../reducers/loginReducer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'

const Menu = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.login.user)

  return (
    <AppBar position="static">
      <Toolbar>
        <div>
          <Button color="inherit" component={Link} to='/'>
            blogs
          </Button>
          <Button color="inherit" component={Link} to='/users'>
            users
          </Button>
          {user.name} logged in<Button color="inherit" onClick={() => dispatch(logOut())}>logout</Button>
        </div>
      </Toolbar>
    </AppBar>
  )}

export default Menu