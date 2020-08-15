import React from 'react'
import { Box, Typography, List, ListItem } from '@material-ui/core'

const User = ({ user }) => {
  if (!user) {
    return null
  }

  return (
    <Box mt={2}>
      <Typography variant="h6">{user.name}</Typography>
      <Typography variant="h4">added blogs</Typography>
      <List>
        {user.blogs.map(blog =>
          <ListItem key={blog.title}>{blog.title}</ListItem>)}
      </List>
    </Box>
  )}

export default User
