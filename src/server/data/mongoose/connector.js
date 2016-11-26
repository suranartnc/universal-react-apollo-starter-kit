import mongoose from 'mongoose'

import './models/category'
import './models/comment'
import './models/post'
import './models/user'

export default (connectionUri) => {
  mongoose.Promise = global.Promise
  mongoose.connect(connectionUri)

  mongoose.connection.on('connected', () => {
    console.log('MongoDB connection established!') // eslint-disable-line no-console
  })

  mongoose.connection.on('error', (err) => {
    console.log('MongoDB connection error. Please make sure MongoDB is running.') // eslint-disable-line no-console
    console.log(err) // eslint-disable-line no-console
  })

  return mongoose
}
