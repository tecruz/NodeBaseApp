import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog } from '../reducers/blogsReducer'
import { fieldChange } from '../reducers/blogFormReducer'
import { Button, TextField, Box } from '@material-ui/core'

const BlogForm = () => {
  const dispatch = useDispatch()

  const title = useSelector(state => state.blogForm.title)
  const author = useSelector(state => state.blogForm.author)
  const url = useSelector(state => state.blogForm.url)

  return (
    <Box className="formDiv">
      <form onSubmit={event => dispatch(createBlog(event))}>
        <TextField required id="fTitle"
          label="Title"
          value={title}
          onChange={event => dispatch(fieldChange(event))}
        /><br/>
        <TextField required id="fAuthor"
          label="Author"
          value={author}
          onChange={event => dispatch(fieldChange(event))}
        /><br/>
        <TextField required id="fUrl"
          label="Url"
          value={url}
          onChange={event => dispatch(fieldChange(event))}
        /><br/>
        <br/>
        <Button variant="contained" color="primary" type="submit">create</Button>
        <br/>
      </form>
    </Box>
  )
}

export default BlogForm