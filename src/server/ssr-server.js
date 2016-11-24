import path from 'path'
import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import proxy from 'http-proxy-middleware'
import favicon from 'serve-favicon'
import config from '../shared/configs'
import ssrMiddleware from './ssrMiddleware'

const app = express()
app.use(favicon(path.join(process.cwd(), 'static/favicon.ico')))
app.use(express.static(path.join(process.cwd(), 'static')))

app.use('/api', proxy({
  target: 'http://localhost:3002',
}))

app.use('/graphql', proxy({
  target: 'http://localhost:3002',
}))

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(ssrMiddleware)

app.listen(config.port, (err) => {
  if (err) {
    console.log(err)
    return
  }
  console.log(`Web server listening on ${config.host}:${config.port}`)
})
