import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import User from '../components/User'

describe('User Component', () => {
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
    name: 'New User',
    blogs: [blog]
  }

  component = render(
    <User user={user} />
  )

  it('renders list item', () => {
    expect(component.container).toHaveTextContent(
      'New Blog'
    )
  })
})