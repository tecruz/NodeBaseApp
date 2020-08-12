import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from '../components/BlogForm'
import { Provider } from 'react-redux'
import Store from '../store'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const component = render(
    <Provider store={Store}>
      <BlogForm />
    </Provider>
  )

  const input = component.container.querySelector('input')
  const form = component.container.querySelector('form')

  fireEvent.change(input, {
    target: { value: 'testing of forms could be easier' }
  })
  fireEvent.submit(form)

  expect(Store.getState().blogForm.title).toBe('testing of forms could be easier' )
})