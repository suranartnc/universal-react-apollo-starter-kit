import passport from 'passport'
import User from '../data/models/UserModel'

const LocalStrategy = require('passport-local').Strategy

/**
 * Sign in using Email and Password.
 */
passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
  User.findOne({ email }, (err, user) => {
    if (err) {
      return done(err)
    }
    if (!user) {
      return done(null, false)
    }

    user.comparePassword(password, function(err, isMatch) {
      if (err) {
        return done(err)
      }
      if (!isMatch) {
        return done(null, false)
      }
      user = {
        _id: user._id,
        email: user.email,
        profile: {
          type: user.profile.type,
          displayName: user.profile.displayName,
          picture: user.profile.picture,
        },
      }
      return done(null, user)
    })
  })
}))
