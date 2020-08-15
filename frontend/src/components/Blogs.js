import React from 'react'
import { useSelector } from 'react-redux'
import Blog from '../components/Blog'
import { Switch, Route, useRouteMatch, Link } from 'react-router-dom'
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@material-ui/core'

const Blogs = () => {
  const blogs = useSelector(state => state.blogs)

  const match = useRouteMatch('/blogs/:id')
  const blog = match? blogs.find(blog => blog.id === match.params.id) : null

  return (
    <Switch>
      <Route path="/blogs/:id">
        <Blog blog={blog}/>
      </Route>
      <Route>
        <Box mt={2}>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {blogs.map(blog => (
                  <TableRow key={blog.id}>
                    <TableCell>
                      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Route>
    </Switch>
  )}

export default Blogs
