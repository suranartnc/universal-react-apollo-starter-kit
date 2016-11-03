import React from 'react'
import { renderToString } from 'react-dom/server'
import { RouterContext, match, applyRouterMiddleware } from 'react-router'
import getRoutes from 'shared/routes'

import config from 'shared/configs'

const wdsPath = `http://${config.host}:${config.wdsPort}/build/`
const assetsManifest = process.env.webpackAssets && JSON.parse(process.env.webpackAssets)

const renderPage = (reactComponents, preloadedData) => (`
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Universal React GraphQL Starter Kit</title>
      ${process.env.NODE_ENV === 'production' ? `<link rel="stylesheet" href="${assetsManifest.app.css}" />` : ''}
    </head>
    <body>
      <div id="root">${reactComponents}</div>
      <script>
        window.preloadedData = ${JSON.stringify(preloadedData)}
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
`)

const GRAPHQL_URL = `http://localhost:3000/graphql`

function matchRoutes(req, res) {
  const routes = getRoutes()
  match({
    location: req.url,
    routes,
  }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps && renderProps.components) {
      const reactComponent = renderToString(
        <RouterContext {...renderProps} />
      )
      res.send(renderPage(reactComponent, {}))
    } else {
      res.status(404).send('Not found')
    }
  })
}

export default function (req, res) {
  matchRoutes(req, res)
}
