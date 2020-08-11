import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { toggleVisibility, initializeView } from '../reducers/togglableReducer'
import Button from '@material-ui/core/Button'

const Togglable = (props) => {
  const id = props.id
  const buttonLabel = props.buttonLabel
  const cancelLabel = props.cancelLabel

  const dispatch = useDispatch()

  let visible
  const toggableViews = useSelector(state => state.togglable)
  const viewToggable = toggableViews.find(view => view.id === id)
  if(viewToggable){
    visible = viewToggable.visibility
  }

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  useEffect(() => {
    dispatch(initializeView(id))
  }, [dispatch, id])

  const toggle = () => {
    dispatch(toggleVisibility(id))
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button variant="contained" color="primary" onClick={toggle}>{buttonLabel}</Button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        {props.children}
        <br/>
        <Button variant="contained" color="primary" onClick={toggle}>{cancelLabel ? cancelLabel : 'cancel'}</Button>
      </div>
    </div>
  )
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable