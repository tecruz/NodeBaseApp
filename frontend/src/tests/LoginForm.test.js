import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import Store from '../store'
import LoginForm from '../components/LoginForm'

describe('LoginForm Component', () => {
  let component
  beforeEach(() => {
    component = render(
      <Provider store={Store}>
        <LoginForm />
      </Provider>
    )
  })

  it('updates fields and calls onSubmit', () => {
    const inputUsername = component.container.querySelector('#username')
    const inputPassword = component.container.querySelector('#password')
    const form = component.container.querySelector('form')

    fireEvent.change(inputUsername, {
      target: { value: 'user' }
    })
    fireEvent.change(inputPassword, {
      target: { value: 'pass' }
    })
    fireEvent.submit(form)

    const state = Store.getState()

    expect(state.login.username).toBe('user')
    expect(state.login.password).toBe('pass')
  })
})