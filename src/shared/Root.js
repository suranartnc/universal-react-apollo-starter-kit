import React, { PropTypes } from 'react'
import { Router, applyRouterMiddleware } from 'react-router'
import useScroll from 'react-router-scroll/lib/useScroll'

const Root = ({ ...renderProps }) => {
  return (
    <Router
      {...renderProps}
    />
  )
}

export default Root
