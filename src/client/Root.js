import React from 'react'
import { Router, browserHistory, applyRouterMiddleware } from 'react-router'
import useScroll from 'react-router-scroll/lib/useScroll'

import { createNetworkInterface } from 'apollo-client'
import { Client } from 'subscriptions-transport-ws'
import { ApolloProvider } from 'react-apollo'
import createApolloClient from 'shared/utils/apollo/createApolloClient'
import addGraphQLSubscriptions from 'shared/utils/apollo/subscriptions'

import { syncHistoryWithStore } from 'react-router-redux'
import getRoutes from 'shared/routes'
import createStore from 'shared/store/createStore'
import config from 'shared/configs'

const wsClient = new Client('ws://localhost:8080')

const networkInterface = createNetworkInterface({
  uri: `http://${config.host}:${config.port}/graphql`,
  opts: {
    credentials: 'same-origin',
  },
  transportBatching: true,
})

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient,
)

const client = createApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
  ssrForceFetchDelay: 100,
})

const store = createStore(client, history, window.__APOLLO_STATE__)
const history = syncHistoryWithStore(browserHistory, store)
const routes = getRoutes(store)

const Root = () => (
  <ApolloProvider store={store} client={client}>
    <Router
      history={history}
      routes={routes}
      render={applyRouterMiddleware(useScroll())}
    />
  </ApolloProvider>
)

export default Root
