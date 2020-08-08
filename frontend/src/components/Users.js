import React from 'react'
import { useSelector } from 'react-redux'
import User from '../components/User'
import {
  Switch, Route, useRouteMatch, Link
} from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@material-ui/core'

const Users = () => {
  const users = useSelector(state => state.users)

  const match = useRouteMatch('/users/:id')
  const user = match? users.find(user => user.id === match.params.id) : null

  return (
    <div>
      <Switch>
        <Route path="/users/:id">
          <User user={user} />
        </Route>
        <Route>
          <h1>Users</h1>
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
    </div>
  )}

export default Users
