import React from 'react'
import Togglable from '../components/Togglable'
import BlogForm from '../components/BlogForm'
import { Box } from '@material-ui/core'

const CreateBlog = () => {
  return(
    <Box mb={2} mt={2}>
      <Togglable id='new blog' buttonLabel='new blog'>
        <BlogForm />
      </Togglable>
    </Box>
  )}

export default CreateBlog
