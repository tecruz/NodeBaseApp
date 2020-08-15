import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../reducers/loginReducer'
import { AppBar, Toolbar, Button, Box } from '@material-ui/core'

const Menu = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.login.user)

  return (
    <AppBar position="static">
      <Toolbar>
        <Box>
          <Button color="inherit" component={Link} to='/'>
            blogs
          </Button>
          <Button color="inherit" component={Link} to='/users'>
            users
          </Button>
          {user.name} logged in<Button color="inherit" onClick={() => dispatch(logOut())}>logout</Button>
        </Box>
      </Toolbar>
    </AppBar>
  )}

export default Menu