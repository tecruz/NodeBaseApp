import React from 'react'
import { useDispatch } from 'react-redux'
import { removeBlog, likeBlog } from '../reducers/blogsReducer'
import { Redirect } from 'react-router-dom'
import { Box, Button, Link } from '@material-ui/core'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()

  if(!blog){
    return (
      <Redirect to='/'/>
    )
  }

  return (
    <Box>
      <Box>
        Title:
      </Box>
      <Box mb={2}>
        <strong>{blog.title} {blog.author}</strong>
      </Box>
      <Box>
        Link:
      </Box>
      <Box mb={2}>
        <Link href={blog.url} target="_blank" rel="noopener">{blog.url}</Link>
      </Box>
      <Box mb={2}>
        Likes: <strong>{blog.likes}</strong>
      </Box>
      <Box>
        User:
      </Box>
      <Box mb={2}>
        <strong>{blog.user.name}</strong>
      </Box>
      <Box mb={2}>
        <Button variant="contained" color="primary" id='likeBtn' onClick={() => dispatch(likeBlog(blog.id))}>like</Button><br/>
      </Box>
      <Box>
        <Button variant="contained" color="secondary" onClick={() => {dispatch(removeBlog(blog.id)) }}>remove</Button>
      </Box>
    </Box>
  )}

export default Blog
