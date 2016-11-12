import _ from 'lodash'
import passport from 'passport'
import User from '../data/models/UserModel'

const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const TwitterStrategy = require('passport-twitter').Strategy

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
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

/**
 * Authorization Required middleware.
 */
exports.isAuthorized = (req, res, next) => {
  const provider = req.path.split('/').slice(-1)[0]

  if (_.find(req.user.tokens, { kind: provider })) {
    next()
  } else {
    res.redirect(`/auth/${provider}`)
  }
}
