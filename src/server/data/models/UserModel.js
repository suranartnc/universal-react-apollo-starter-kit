import bcrypt from 'bcrypt-nodejs'
import crypto from 'crypto'
import mongoose from 'mongoose'

const userType = ['admin', 'subscriber']

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  // passwordResetToken: String,
  // passwordResetExpires: Date,

  // facebook: String,
  // twitter: String,
  // tokens: Array,

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
}, { timestamps: true })

UserSchema.pre('save', function save(next) {
  const user = this
  if (!user.isModified('password')) { return next() }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err) }
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) { return next(err) }
      user.password = hash
      next()
    })
  })
})

/**
 * Helper method for validating user's password.
 */
UserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch)
  })
}

export default mongoose.model('User', UserSchema)
