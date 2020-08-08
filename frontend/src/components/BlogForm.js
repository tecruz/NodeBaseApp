import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog } from '../reducers/blogsReducer'
import { fieldChange } from '../reducers/blogFormReducer'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const BlogForm = () => {
  const dispatch = useDispatch()

  const title = useSelector(state => state.blogForm.title)
  const author = useSelector(state => state.blogForm.author)
  const url = useSelector(state => state.blogForm.url)

  return (
    <div className="formDiv">
      <form onSubmit={event => dispatch(createBlog(event))}>
        <TextField id="fTitle"
          label="Title"
          value={title}
          onChange={event => dispatch(fieldChange(event))}
        /><br/>
        <TextField id="fAuthor"
          label="Author"
          value={author}
          onChange={event => dispatch(fieldChange(event))}
        /><br/>
        <TextField id="fUrl"
          label="Url"
          value={url}
          onChange={event => dispatch(fieldChange(event))}
        /><br/>
        <Button variant="contained" color="primary" type="submit">create</Button>
      </form>
    </div>
  )
}

export default BlogForm