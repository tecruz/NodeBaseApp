import React from 'react'
import Togglable from '../components/Togglable'
import LoginForm from '../components/LoginForm'
import Notification from '../components/Notification'
import { Box, Typography } from '@material-ui/core'

const Login = () => {
  return (
    <Box>
      <Typography variant="h3">blog app</Typography>
      <Notification/>
      <Togglable id='login' buttonLabel='login'>
        <LoginForm />
      </Togglable>
    </Box>
  )}

export default Login