import React from 'react'
import { Router, browserHistory } from 'react-router'
import { ApolloProvider } from 'react-apollo'
import getRoutes from 'shared/routes'
import createApolloClient from 'shared/createApolloClient'

const client = createApolloClient({
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
