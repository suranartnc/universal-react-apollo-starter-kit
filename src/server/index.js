import path from 'path'
import mongoose from 'mongoose'
import express from 'express'
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import favicon from 'serve-favicon'
import reactCookie from 'react-cookie'
import jwt from 'jsonwebtoken'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

import config from 'shared/configs'
import schema from 'server/data/schema.js'
import passport from 'passport'
import routeHandlers from './routes'
import ssr from './ssr'
import webpackConfig from '../../webpack.config.dev.babel.js'

const mongodbUri = 'mongodb://localhost:27017/urrsk'
mongoose.connect(mongodbUri)
mongoose.connection.on('connected', () => {
  console.log('%s MongoDB connection established!', "Yes, ")
})
mongoose.connection.on('error', () => {
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', "No!!")
  process.exit()
})
mongoose.Promise = global.Promise

const app = express()
app.use(favicon(path.join(process.cwd(), 'static/favicon.ico')))
app.use(express.static(path.join(process.cwd(), 'static')))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(passport.initialize())
app.use(routeHandlers)

app.use('/graphql', graphqlExpress((req, res) => {
  let user = {
    _id: '',
    email: '',
    profile: {
      type: 'guest',
      picture: '',
    },
  }
  reactCookie.plugToRequest(req, res)
  const token = reactCookie.load('AUTH_TOKEN')
  if (token) {
    user = jwt.decode(token)
  }

  return {
    schema,
    context: {
      user,
    },
  }
}))

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}))

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

app.use(ssr)

app.listen(config.port, (err) => {
  if (err) {
    console.log(err)
    return
  }
  console.log(`Web server listening on ${config.host}:${config.port}`)
})
