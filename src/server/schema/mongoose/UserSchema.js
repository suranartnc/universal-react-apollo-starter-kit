import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  displayName: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  photoURL: {
    type: String,
  },
  oauthID: Number,
  oauthStrategy: String,
  createdAt: Number,
})

const User = mongoose.model('User', UserSchema)

export default User
