import React from 'react'
import { renderToString } from 'react-dom/server'
import { RouterContext, match } from 'react-router'
import { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { getDataFromTree } from 'react-apollo/server'
import 'isomorphic-fetch'
import getRoutes from 'shared/routes'
import config from 'shared/configs'
import createApolloClient from 'shared/createApolloClient'

const routes = getRoutes()

const wdsPath = `http://${config.host}:${config.wdsPort}/build/`
const assetsManifest = process.env.webpackAssets && JSON.parse(process.env.webpackAssets)

function renderPage(content, state) {
  return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Universal React GraphQL Starter Kit</title>
        ${process.env.NODE_ENV === 'production' ? `<link rel="stylesheet" href="${assetsManifest.app.css}" />` : ''}
      </head>
      <body>
        <div id="root">${content}</div>
        <script>
          window.__APOLLO_STATE__ = ${JSON.stringify({ apollo: { data: state } })};
        </script>
        ${process.env.NODE_ENV === 'production' ?
          `
            <script src="${assetsManifest.vendor.js}"></script>
            <script src="${assetsManifest.app.js}"></script>
          `
          : `<script src="${wdsPath}main.js"></script>`
        }
      </body>
    </html>
  `
}

function matchRoutes(req, res) {
  match({
    location: req.originalUrl,
    routes,
  }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps && renderProps.components) {
      // console.log('headers', req.headers.cookie)
      const client = createApolloClient({
        ssrMode: true,
        networkInterface: createNetworkInterface({
          uri: 'http://localhost:3000/graphql',
          opts: {
            credentials: 'same-origin',
            headers: req.headers,
          },
        }),
      })

      const component = (
        <ApolloProvider client={client}>
          <RouterContext {...renderProps} />
        </ApolloProvider>
      )
      getDataFromTree(component)
        .then((context) => {
          const content = renderToString(component)
          const html = renderPage(content, context.store.getState().apollo.data)
          res.status(200).send(html)
        })
        .catch(e => console.error('RENDERING ERROR:', e))
    } else {
      res.status(404).send('Not found')
    }
  })
}

export default function (req, res) {
  matchRoutes(req, res)
}
