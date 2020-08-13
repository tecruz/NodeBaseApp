import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import CreateBlog from '../components/CreateBlog'
import { Provider } from 'react-redux'
import Store from '../store'

describe('CreateBlog Component', () => {
  let component

  beforeEach(() => {
    component = render(
      <Provider store={Store}>
        <CreateBlog />
      </Provider>
    )
  })

  it('renders content', () => {
    expect(component.container).toHaveTextContent(
      'new blog'
    )
  })
})