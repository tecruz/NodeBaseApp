import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Store from './store'
import { Provider } from 'react-redux'
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.render(
  <Provider store={Store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)