import React from 'react'
import { Router, browserHistory } from 'react-router'
import getRoutes from 'shared/routes'

const routes = getRoutes()

const Root = () => {
  return (
    <Router
      history={browserHistory}
      routes={routes}
    />
  )
}

export default Root
