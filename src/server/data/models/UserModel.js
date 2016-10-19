import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    index: true,
    default: mongoose.Types.ObjectId,
  },
  type: String,
  displayName: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  avatar: String,
  oauthID: Number,
  oauthStrategy: String,
  date: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model('User', UserSchema)
