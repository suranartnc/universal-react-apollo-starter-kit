import React from 'react'
import { Router, browserHistory } from 'react-router'
import { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import getRoutes from 'shared/routes'
import createApolloClient from 'shared/createApolloClient'

const client = createApolloClient({
  initialState: window.__APOLLO_STATE__,
  networkInterface: createNetworkInterface({
    uri: 'http://localhost:3000/graphql',
    opts: {
      credentials: 'same-origin',
    },
    transportBatching: true,
  }),
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
