import mongoose from 'mongoose'

const userType = ['admin', 'subscriber']

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  passwordResetToken: String,
  passwordResetExpires: Date,

  facebook: String,
  twitter: String,
  tokens: Array,

  profile: {
    type: {
      type: String,
      enum: userType,
      default: 'subscriber',
    },
    displayName: String,
    picture: {
      type: String,
      default: 'https://thesocietypages.org/socimages/files/2009/05/vimeo.jpg',
    },
  },

  // date: {
  //   type: Date,
  //   default: Date.now,
  // },
}, { timestamps: true })

export default mongoose.model('User', UserSchema)
