import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Login from '../components/Login'
import { Provider } from 'react-redux'
import Store from '../store'

describe('CreateBlog Component', () => {
  let component

  beforeEach(() => {
    component = render(
      <Provider store={Store}>
        <Login />
      </Provider>
    )
  })

  it('renders content', () => {
    expect(component.container).toHaveTextContent(
      'login'
    )
  })
})