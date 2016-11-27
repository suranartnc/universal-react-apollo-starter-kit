import path from 'path'
import express from 'express'
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import favicon from 'serve-favicon'
import passport from 'passport'
import reactCookie from 'react-cookie'
import jwt from 'jsonwebtoken'

import { createServer } from 'http'
import { SubscriptionServer } from 'subscriptions-transport-ws'
import { subscriptionManager } from 'server/data/subscriptions/setup'

import config from 'shared/configs'
import schema from 'server/data/schema.js'
import routeHandlers from './routes'
import mongooseConnector from './data/mongoose/connector'

const mongoose = mongooseConnector(config.mongoConnectionString)

const app = express()
app.use(favicon(path.join(process.cwd(), 'static/favicon.ico')))
app.use(express.static(path.join(process.cwd(), 'static')))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(passport.initialize())
app.use(routeHandlers)

function getUser(req, res) {
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
  return user
}

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}))

app.use('/graphql', graphqlExpress((req, res) => {
  const user = getUser(req, res)
  return {
    schema,
    context: {
      user,
      PostModel: mongoose.model('Post'),
      UserModel: mongoose.model('User'),
      CommentModel: mongoose.model('Comment'),
      CategoryModel: mongoose.model('Category'),
    },
    // formatError() {

    // },
    // debug: true,
  }
}))

app.listen(config.apiPort, (err) => {
  if (err) {
    console.log(err)
    return
  }
  console.log(`GraphQL server listening on ${config.apiHost}:${config.apiPort}`)
})

// WebSocket server for subscriptions
const websocketServer = createServer((request, response) => {
  response.writeHead(404)
  response.end()
})

websocketServer.listen(config.wsPort, () => console.log( // eslint-disable-line no-console
  `Websocket Server is now running on http://localhost:${config.wsPort}`
))

// eslint-disable-next-line
new SubscriptionServer(
  {
    subscriptionManager,

    // the obSubscribe function is called for every new subscription
    // and we use it to set the GraphQL context for this subscription
    onSubscribe: (msg, params) => {
      // console.log('onSubscribe', msg, params)
      const user = {
        _id: '',
        email: '',
        profile: {
          type: 'guest',
          picture: '',
        },
      }
      return Object.assign({}, params, {
        context: {
          user,
          PostModel: mongoose.model('Post'),
          UserModel: mongoose.model('User'),
          CommentModel: mongoose.model('Comment'),
          CategoryModel: mongoose.model('Category'),
        },
      })
    },
  },
  websocketServer
)
