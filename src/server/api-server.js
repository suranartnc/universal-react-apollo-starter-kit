import path from 'path'
import mongoose from 'mongoose'
import express from 'express'
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import favicon from 'serve-favicon'
import reactCookie from 'react-cookie'
import jwt from 'jsonwebtoken'

import config from 'shared/configs'
import schema from 'server/data/schema.js'

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

app.listen(config.apiPort, (err) => {
  if (err) {
    console.log(err)
    return
  }
  console.log(`GraphQL server listening on ${config.host}:${config.apiPort}`)
})
