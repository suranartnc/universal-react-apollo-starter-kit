import path from 'path'
import mongoose from 'mongoose'
import express from 'express'
import graphqlHTTP from 'express-graphql'
import favicon from 'serve-favicon'

import config from 'shared/configs'
import schema from 'server/data/schema.js'
import ssr from './ssr'

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

app.post('/graphql', (req, res, next) => {
  setTimeout(() => {
    next()
  }, 1500)
})

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}))

app.use(ssr)

app.listen(config.port, (err) => {
  if (err) {
    console.log(err)
    return
  }
  console.log(`Web server listening on ${config.host}:${config.port}`)
})
