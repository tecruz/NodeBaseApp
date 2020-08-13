import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Menu from '../components/Menu'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { BrowserRouter as Router } from 'react-router-dom'

const mockStore = configureStore([])

describe('Menu Component', () => {
  let store
  let component

  const user = {
    name: 'Me'
  }

  beforeEach(() => {
    store = mockStore({
      login: { user: user }
    })

    store.dispatch = jest.fn()

    component = render(
      <Router>
        <Provider store={store}>
          <Menu />
        </Provider>
      </Router>
    )

  })


  it('shows the name of the user logged in', () => {
    expect(component.container).toHaveTextContent(
      'Me'
    )
  })

  it('logout button click dispatch event', () => {
    const button = component.getByText('logout')
    fireEvent.click(button)

    expect(store.dispatch).toHaveBeenCalledTimes(1)
  })
})