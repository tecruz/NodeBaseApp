import blogService from '../services/blogs'
import { addNotification, removeNotification } from '../reducers/notificationReducer'
import { toggleVisibility } from '../reducers/togglableReducer'
import { resetFields } from '../reducers/blogFormReducer'

const showNotification = (message, type, dispatch) => {
  dispatch(addNotification( message, type ))
  setTimeout(() => {
    dispatch(removeNotification())
  }, 5000)
}

const reducer = (state = [], action) => {
  switch(action.type) {
  case 'NEW_BLOG':
    return state.concat(action.data)
  case 'REMOVE_BLOG':
    return state.filter(blog => blog.id !== action.data.id)
  case 'LIKE':
    return state.map(blog => blog.id !== action.data.id ? blog : action.data)
  case 'INIT_BLOGS':
    return action.data
  default:
    return state
  }
}

export const createBlog = event => {
  event.preventDefault()
  return async (dispatch, getState) => {
    const { blogForm } = getState()
    const blogObject = {
      title: blogForm.title,
      author: blogForm.author,
      url: blogForm.url
    }
    const returnedBlog = await blogService.create(blogObject)
    dispatch({
      type: 'NEW_BLOG',
      data: returnedBlog
    })
    dispatch(resetFields())
    dispatch(toggleVisibility('new blog'))
    showNotification(`A new blog ${returnedBlog.title} by ${returnedBlog.author}`, 'success', dispatch)
  }
}

export const likeBlog = (id) => {
  return async (dispatch, getState) => {
    const { blogs } = getState()
    const blogToUpdate = blogs.find((blog) => blog.id === id)
    const likedBlog = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1
    }
    const updatedBlog = await blogService.update(likedBlog)
    dispatch({
      type: 'LIKE',
      data: updatedBlog
    })
  }
}

export const removeBlog = (id) => {
  return async (dispatch, getState) => {
    const { blogs } = getState()
    const blogToDelete = blogs.find((blog) => blog.id === id)
    if(window.confirm(`Remove blog ${blogToDelete.title} by ${blogToDelete.author}?`)) {
      await blogService.deleteBlog(blogToDelete.id)
      dispatch({
        type: 'REMOVE_BLOG',
        data: blogToDelete
      })
      showNotification(`Blog ${blogToDelete.title} was removed`, 'success', dispatch)
    }
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export default reducer