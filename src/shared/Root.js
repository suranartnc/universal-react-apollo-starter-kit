import React from 'react'
import { Router, browserHistory } from 'react-router'

import ApolloClient, { createNetworkInterface } from 'apollo-client'
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
