import React, { useEffect } from 'react'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import Login from './components/Login'
import Menu from './components/Menu'
import CreateBlog from './components/CreateBlog'
import Users from './components/Users'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
import { initializeUser } from './reducers/loginReducer'
import { initializeUsers } from './reducers/usersReducer'
import {
  Switch, Route, useHistory
} from 'react-router-dom'
import Container from '@material-ui/core/Container'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.login.user)
  const blogs = useSelector(state => state.blogs)
  const history = useHistory()

  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch])

  useEffect(() => {
    if(user && blogs.length === 0) {
      dispatch(initializeBlogs())
      dispatch(initializeUsers())
      history.push('/')
    }
  }, [user, blogs.length, history, dispatch])

  return (
    <Container>
      <div>
        {user === null ?
          <Login/> :
          <div>
            <Menu/>
            <Notification/>
            <h1>blog app</h1>
            <Switch>
              <Route path='/users'>
                <Users/>
              </Route>
              <Route path='/'>
                <CreateBlog/>
                <Blogs/>
              </Route>
            </Switch>
          </div>
        }
      </div>
    </Container>
  )
}

export default App