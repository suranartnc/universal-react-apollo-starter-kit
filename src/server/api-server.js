import path from 'path'
import express from 'express'
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import favicon from 'serve-favicon'
import passport from 'passport'
import reactCookie from 'react-cookie'
import jwt from 'jsonwebtoken'

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

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}))

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
      PostModel: mongoose.model('Post'),
      UserModel: mongoose.model('User'),
      CommentModel: mongoose.model('Comment'),
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
