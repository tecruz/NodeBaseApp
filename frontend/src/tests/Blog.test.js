import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from '../components/Blog'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

const mockStore = configureStore([])

describe('Blog Component', () => {
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

  beforeEach(() => {
    store = mockStore({
      blogs: blog
    })

    store.dispatch = jest.fn()

    component = render(
      <Provider store={store}>
        <Blog blog={blog} />
      </Provider>)
  })

  it('renders content', () => {
    expect(component.container).toHaveTextContent(
      'Me'
    )
  })

  it('clicking the like button calls event handler once', () => {
    const button = component.getByText('like')
    fireEvent.click(button)

    expect(store.dispatch).toHaveBeenCalledTimes(1)
  })
})