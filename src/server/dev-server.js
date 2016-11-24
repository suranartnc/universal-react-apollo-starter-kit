import path from 'path'
import express from 'express'
import favicon from 'serve-favicon'

import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

import config from 'shared/configs'
import webpackConfig from '../../webpack.config.dev.babel.js'

const app = express()
app.use(favicon(path.join(process.cwd(), 'static/favicon.ico')))
app.use(express.static(path.join(process.cwd(), 'static')))

if (!config.isProduction) {
  const compiler = webpack(webpackConfig)

  // Webpack DashboardPlugin
  // const Dashboard = require('webpack-dashboard')
  // const DashboardPlugin = require('webpack-dashboard/plugin')
  // const dashboard = new Dashboard()
  // compiler.apply(new DashboardPlugin(dashboard.setData))

  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
  }))
  app.use(webpackHotMiddleware(compiler))
}

app.listen(config.wdsPort, (err) => {
  if (err) {
    console.log(err)
    return
  }
  console.log(`Webpack Dev Server listening on ${config.host}:${config.wdsPort}`)
})
