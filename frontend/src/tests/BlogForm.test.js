import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from '../components/BlogForm'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

const mockStore = configureStore([])

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const store = mockStore({
      blogForm: { title: '', author: '', url:'' }
  })

  store.dispatch = jest.fn()

  const component = render(
    <Provider store={store}>
      <BlogForm />
    </Provider>
  )

  const input = component.container.querySelector('input')
  const form = component.container.querySelector('form')

  fireEvent.change(input, {
    target: { value: 'testing of forms could be easier' }
  })
  fireEvent.submit(form)

  expect(store.dispatch).toHaveBeenCalledTimes(1)
  expect(store.getState().blogForm.title).toBe('testing of forms could be easier' )
})