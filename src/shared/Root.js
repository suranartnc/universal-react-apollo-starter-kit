import React from 'react'
import { Router, browserHistory } from 'react-router'

import ApolloClient from 'apollo-client'
import { ApolloProvider } from 'react-apollo'

import getRoutes from 'shared/routes'

const client = new ApolloClient({
  initialState: window.__APOLLO_STATE__,
})

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
