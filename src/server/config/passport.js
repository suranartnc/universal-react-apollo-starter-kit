import passport from 'passport'
import User from '../data/models/UserModel'

const LocalStrategy = require('passport-local').Strategy

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser((_id, done) => {
  User.findById(_id, (err, user) => {
    done(err, user)
  })
})

/**
 * Sign in using Email and Password.
 */
passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
  User.findOne({ email: email.toLowerCase() }, (err, user) => {
    if (err) { return done(err) }
    if (!user) {
      return done(null, false, { msg: `Email ${email} not found.` })
    }
    user.comparePassword(password, (err, isMatch) => {
      if (err) { return done(err) }
      if (isMatch) {
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
      }
      return done(null, false, { msg: 'Invalid email or password.' })
    })
  })
}))


/**
 * Login Required middleware.
 */
exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login')
}
