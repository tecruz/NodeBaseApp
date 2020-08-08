import React from 'react'
import Togglable from '../components/Togglable'
import LoginForm from '../components/LoginForm'
import Notification from '../components/Notification'

const Login = () => {
  return (
    <div>
      <h1>blog app</h1>
      <Notification/>
      <Togglable id='login' buttonLabel='login'>
        <LoginForm />
      </Togglable>
    </div>
  )}

export default Login