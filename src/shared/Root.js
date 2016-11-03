import React from 'react'
import { Router, browserHistory, applyRouterMiddleware } from 'react-router'

import ApolloClient from 'apollo-client'
import { ApolloProvider } from 'react-apollo'

import getRoutes from 'shared/routes'

const client = new ApolloClient()
const routes = getRoutes()

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router
        history={browserHistory}
        routes={routes}
      />
    </ApolloProvider>
  )
}

export default Root
