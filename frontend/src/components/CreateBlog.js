import React from 'react'
import Togglable from '../components/Togglable'
import BlogForm from '../components/BlogForm'

const CreateBlog = () => {
  return(
    <div>
      <Togglable id='new blog' buttonLabel='new blog'>
        <BlogForm />
      </Togglable>
    </div>
  )}

export default CreateBlog
