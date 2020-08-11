import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from '../components/Blog'
import { Provider } from 'react-redux'
import Store from '../store'

test('renders content', () => {
  const blog = {
    title: 'New Blog',
    author: 'Me',
    url: 'http://localhost/index.html',
    likes: 9999,
    user : {
      name: 'name'
    }
  }

  const component = render(
    <Provider store={Store}>
      <Blog blog={blog} />
    </Provider>
  )

  expect(component.container).toHaveTextContent(
    'Me'
  )
})