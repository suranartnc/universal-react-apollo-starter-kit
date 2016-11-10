import mongoose from 'mongoose'

const userType = ['admin', 'subscriber']

const UserSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: userType,
    default: 'subscriber',
  },
  displayName: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: 'https://thesocietypages.org/socimages/files/2009/05/vimeo.jpg',
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model('User', UserSchema)
