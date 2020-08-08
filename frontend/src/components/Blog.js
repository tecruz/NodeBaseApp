import React from 'react'
import { useDispatch } from 'react-redux'
import { removeBlog, likeBlog } from '../reducers/blogsReducer'
import { Redirect } from 'react-router-dom'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()

  if(!blog){
    return (
      <Redirect to='/'/>
    )
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div>
        <strong>{blog.title} {blog.author}</strong>
        <div>
          <strong>{blog.url}</strong><br/>
          <strong>likes {blog.likes}</strong><button id='likeBtn' onClick={() => dispatch(likeBlog(blog.id))}>like</button><br/>
          <strong>{blog.user.name}</strong>
          <button onClick={() => {
            dispatch(removeBlog(blog.id))
          }}>remove</button>
        </div>
      </div>
    </div>
  )}

export default Blog
