import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Togglable from '../components/Togglable'
import { Provider } from 'react-redux'
import Store from '../store'

describe('<Togglable />', () => {
  let component

  beforeEach(() => {
    component = render(
      <Provider store={Store}>
        <Togglable  id='test' buttonLabel="show...">
          <div className="testDiv" />
        </Togglable>
      </Provider>
    )
  })

  test('renders its children', () => {
    expect(
      component.container.querySelector('.testDiv')
    ).toBeTruthy()
  })

  test('at start the children are not displayed', () => {
    const div = component.container.querySelector('.togglableContent')

    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', () => {
    const button = component.getByText('show...')
    fireEvent.click(button)

    const div = component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

})