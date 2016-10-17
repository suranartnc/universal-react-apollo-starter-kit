import React from 'react'
import { render } from 'react-dom'

import Relay from 'react-relay'
import IsomorphicRelay from 'isomorphic-relay'
import IsomorphicRouter from 'isomorphic-relay-router'

import { match, browserHistory } from 'react-router'
import Root from 'shared/Root'
import getRoutes from 'shared/routes'

const initialState = window.__INITIAL_STATE__
const preloadedData = window.preloadedData
const routes = getRoutes()
const mountNode = document.getElementById('root')

const relay = new Relay.Environment()

relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('http://localhost:3000/graphql', {
    fetchTimeout: 10000,   // Timeout after 30s.
    retryDelays: [1000],   // Only retry once after a 5s delay.
  })
)

IsomorphicRelay.injectPreparedData(relay, preloadedData)

match({ history, routes }, (error, redirectLocation, renderProps) => {
  IsomorphicRouter.prepareInitialRender(relay, renderProps)
    .then((props) => {
      render(
        <Root {...props} store={store} />,
        mountNode
      )
    })
})
