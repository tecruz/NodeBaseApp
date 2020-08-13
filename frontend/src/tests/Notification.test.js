import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Notification from '../components/Notification'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

const mockStore = configureStore([])

describe('Notification Component', () => {

  it('return null with no message', () => {
    const store = mockStore({
      notification: { message: null, type: null }
    })

    const component = render(
      <Provider store={store}>
        <Notification />
      </Provider>
    )

    expect(component.container).toBeEmpty()
  })

  it('displays success notification with type sucess', () => {
    const store = mockStore({
      notification: { message: 'Success message', type: 'success' }
    })

    const component = render(
      <Provider store={store}>
        <Notification />
      </Provider>
    )

    expect(component.container).not.toBeEmpty()
    expect(component.container).toHaveTextContent(
      'Success message'
    )
  })

  it('displays error notification with type error', () => {
    const store = mockStore({
      notification: { message: 'Error message', type: 'error' }
    })

    const component = render(
      <Provider store={store}>
        <Notification />
      </Provider>
    )

    expect(component.container).not.toBeEmpty()
    expect(component.container).toHaveTextContent(
      'Error message'
    )
  })
})