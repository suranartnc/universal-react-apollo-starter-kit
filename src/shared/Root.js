import React, { PropTypes } from 'react'
import { Router, applyRouterMiddleware } from 'react-router'
import useScroll from 'react-router-scroll/lib/useScroll'

const Root = ({ store, ...renderProps }) => {
  return (
    <Router
      {...renderProps}
    />
  )
}

Root.propTypes = {
  store: PropTypes.shape({
    dispatch: PropTypes.func.isRequired,
    getState: PropTypes.func.isRequired,
    subscribe: PropTypes.func.isRequired,
  }).isRequired,
}

export default Root
