import path from 'path'
import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import favicon from 'serve-favicon'
import proxy from 'http-proxy-middleware'

import config from 'shared/configs'
import passport from 'passport'
import routeHandlers from './routes'
import ssrMiddleware from './ssrMiddleware'

const apiUrl = `http://${config.apiHost}${config.apiPort !== 80 ? `:${config.apiPort}` : ''}`
console.log('===apiUrl', apiUrl)

const apiProxy = proxy({
  target: apiUrl,
  changeOrigin: true,
  proxyTimeout: 6000,
})

const app = express()
app.use(favicon(path.join(process.cwd(), 'static/favicon.ico')))
app.use(express.static(path.join(process.cwd(), 'static')))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(passport.initialize())
app.use(routeHandlers)

app.use('/graphql', apiProxy)
app.use('/graphiql', apiProxy)

app.use(ssrMiddleware)

app.listen(config.port, (err) => {
  if (err) {
    console.log(err)
    return
  }
  console.log(`Web server listening on ${config.host}:${config.port}`)
})
