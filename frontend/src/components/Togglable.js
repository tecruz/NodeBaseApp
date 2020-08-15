import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { toggleVisibility, initializeView } from '../reducers/togglableReducer'
import { Button, Box } from '@material-ui/core'

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
    <Box>
      <Box style={hideWhenVisible}>
        <Button variant="contained" color="primary" onClick={toggle}>{buttonLabel}</Button>
      </Box>
      <Box style={showWhenVisible} className="togglableContent">
        {props.children}
        <br/>
        <Button variant="contained" color="primary" onClick={toggle}>{cancelLabel ? cancelLabel : 'cancel'}</Button>
      </Box>
    </Box>
  )
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable