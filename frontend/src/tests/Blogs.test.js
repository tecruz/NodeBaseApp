import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blogs from '../components/Blogs'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { BrowserRouter as Router } from 'react-router-dom'

const mockStore = configureStore([])

describe('Blogs Component', () => {
  let store
  let component
  const blog = {
    id: 1,
    title: 'New Blog',
    author: 'Me',
    url: 'http://localhost/index.html',
    likes: 9999,
    user : {
      name: 'name'
    }
  }

  beforeEach(() => {
    store = mockStore({
      blogs: [blog]
    })

    store.dispatch = jest.fn()

    component = render(
      <Router>
        <Provider store={store}>
          <Blogs />
        </Provider>
      </Router>)
  })

  it('renders content', () => {
    expect(component.container).toHaveTextContent(
      'New Blog'
    )
  })
})