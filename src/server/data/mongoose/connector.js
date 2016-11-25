import mongoose from 'mongoose'

export default (connectionUri) => {
  mongoose.Promise = global.Promise
  mongoose.connect(connectionUri)

  mongoose.connection.on('connected', () => {
    console.log('%s MongoDB connection established!', "Yes, ")
  })

  mongoose.connection.on('error', () => {
    console.log('%s MongoDB connection error. Please make sure MongoDB is running.', "No!!")
    process.exit()
  })

  return mongoose
}
