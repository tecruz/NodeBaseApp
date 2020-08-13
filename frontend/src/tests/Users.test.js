import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Users from '../components/Users'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { BrowserRouter as Router } from 'react-router-dom'

const mockStore = configureStore([])

describe('Users Component', () => {
  let store
  let component
  const blog = {
    title: 'New Blog',
    author: 'Me',
    url: 'http://localhost/index.html',
    likes: 9999,
    user : {
      name: 'name'
    }
  }

  const user = {
    id: 1,
    name: 'New User',
    blogs: [blog]
  }

  beforeEach(() => {
    store = mockStore({
      users: [user]
    })

    store.dispatch = jest.fn()

    component = render(
      <Router>
        <Provider store={store}>
          <Users />
        </Provider>
      </Router>)
  })

  it('renders content', () => {
    expect(component.container).toHaveTextContent(
      'New User'
    )
    expect(component.container).toHaveTextContent(
      '1'
    )
  })
})