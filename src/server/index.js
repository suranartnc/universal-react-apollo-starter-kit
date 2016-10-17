import path from 'path'
import express from 'express'
import graphqlHTTP from 'express-graphql'
import favicon from 'serve-favicon'

import config from 'shared/configs'
import schema from 'server/schema/graphql/schema.js'
import ssr from './ssr'

const app = express()
app.use(favicon(path.join(process.cwd(), 'static/favicon.ico')))
app.use(express.static(path.join(process.cwd(), 'static')))

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
