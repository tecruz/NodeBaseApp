import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from '@material-ui/lab'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  if (notification.message === null) {
    return null
  }

  if(notification.type === 'error'){
    return (
      <Alert severity="error">
        {notification.message}
      </Alert>
    )
  }

  return (
    <Alert className="success">
      {notification.message}
    </Alert>
  )
}

export default Notification