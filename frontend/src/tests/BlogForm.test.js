import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from '../components/BlogForm'
import { Provider } from 'react-redux'
import Store from '../store'

describe('BlogForm Component', () => {
  let component
  beforeEach(() => {
    component = render(
      <Provider store={Store}>
        <BlogForm />
      </Provider>
    )
  })

  it('updates fields and calls onSubmit', () => {
    const inputTitle = component.container.querySelector('#fTitle')
    const inputAuthor = component.container.querySelector('#fAuthor')
    const inputUrl = component.container.querySelector('#fUrl')
    const form = component.container.querySelector('form')

    fireEvent.change(inputTitle, {
      target: { value: 'New title' }
    })
    fireEvent.change(inputAuthor, {
      target: { value: 'New author' }
    })
    fireEvent.change(inputUrl, {
      target: { value: 'New url' }
    })
    fireEvent.submit(form)

    const state = Store.getState()

    expect(state.blogForm.title).toBe('New title')
    expect(state.blogForm.author).toBe('New author')
    expect(state.blogForm.url).toBe('New url')
  })
})