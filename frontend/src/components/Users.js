import React from 'react'
import { useSelector } from 'react-redux'
import User from '../components/User'
import {
  Switch, Route, useRouteMatch, Link
} from 'react-router-dom'
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography
} from '@material-ui/core'

const Users = () => {
  const users = useSelector(state => state.users)

  const match = useRouteMatch('/users/:id')
  const user = match? users.find(user => user.id === match.params.id) : null

  return (
    <Box mt={2}>
      <Switch>
        <Route path="/users/:id">
          <User user={user} />
        </Route>
        <Route>
          <Typography variant="h6">Users</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell><strong>blogs created</strong></TableCell>
                </TableRow>
                {users.map(user =>
                  <TableRow key={user.id}>
                    <TableCell><Link to={`/users/${user.id}`}>{user.name}</Link></TableCell>
                    <TableCell>{user.blogs.length}</TableCell>
                  </TableRow>)}
              </TableBody>
            </Table>
          </TableContainer>
        </Route>
      </Switch>
    </Box>
  )}

export default Users
