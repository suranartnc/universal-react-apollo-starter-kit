import React from 'react'
import { renderToString } from 'react-dom/server'
import { RouterContext, match } from 'react-router'
import { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { getDataFromTree } from 'react-apollo/server'
import reactCookie from 'react-cookie'
import 'isomorphic-fetch'
import getRoutes from 'shared/routes'
import config from 'shared/configs'
import createApolloClient from 'shared/utils/apollo/createApolloClient'
import createStore from 'shared/store/createStore'
import { MEMBER_LOAD_AUTH } from 'shared/actions/userActions'

const wdsPath = `http://${config.host}:${config.wdsPort}/build/`
const serverPath = `http://${config.host}:${config.port}/`
const assetsManifest = process.env.webpackAssets && JSON.parse(process.env.webpackAssets)

function renderPage(content, state) {
  return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Universal React GraphQL Starter Kit</title>
        <link rel="stylesheet" href="${serverPath}css/bootstrap-flex.min.css">
        ${process.env.NODE_ENV === 'production' ? `<link rel="stylesheet" href="${assetsManifest.main.css}" />` : ''}
      </head>
      <body>
        <div id="root">${content}</div>
        <script>
          window.__APOLLO_STATE__ = ${JSON.stringify({
            ...state,
            apollo: { data: state.apollo.data },
          })}
        </script>
        ${process.env.NODE_ENV === 'production' ?
          `
            <script src="${serverPath}build/vendor-react.js"></script>
            <script src="${assetsManifest.main.js}"></script>
          `
          : `
            <script src="${serverPath}build/vendor-react.js"></script>
            <script src="${wdsPath}main.js"></script>
          `
        }
      </body>
    </html>
  `
}

export default function (req, res) {
  reactCookie.plugToRequest(req, res)
  const client = createApolloClient({
    ssrMode: true,
    networkInterface: createNetworkInterface({
      uri: `http://${config.host}:${config.port}/graphql`,
      opts: {
        credentials: 'same-origin',
        headers: req.headers,
      },
    }),
  })
  const store = createStore(client)
  store.dispatch({
    type: MEMBER_LOAD_AUTH,
  })
  const routes = getRoutes(store)
  match({
    location: req.originalUrl,
    routes,
  }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps && renderProps.components) {
      const component = (
        <ApolloProvider store={store} client={client}>
          <RouterContext {...renderProps} />
        </ApolloProvider>
      )
      getDataFromTree(component)
        .then((context) => {
          const content = renderToString(component)
          const html = renderPage(content, context.store.getState())
          res.status(200).send(html)
        })
        .catch(e => console.error('RENDERING ERROR:', e))
    } else {
      res.status(404).send('Not found')
    }
  })
}
