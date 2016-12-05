import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as FacebookStrategy } from 'passport-facebook'

import User from '../data/mongoose/models/user'
import oAuthConfig from 'server/config/oAuth'

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


/**
 * Sign in with Facebook.
 */
passport.use(new FacebookStrategy({
  clientID: oAuthConfig.facebook.clientID,
  clientSecret: oAuthConfig.facebook.clientSecret,
  callbackURL: oAuthConfig.facebook.callbackURL,
  profileFields: ['name', 'displayName', 'email', 'birthday', 'gender', 'link', 'locale', 'timezone'],
  passReqToCallback: true,
}, (req, accessToken, refreshToken, profile, done) => {
  User.findOne({ facebook: profile.id }, (err, existingUser) => {
    if (err) { return done(err) }
    if (existingUser) {
      return done(null, existingUser)
    }
    User.findOne({ email: profile._json.email }, (err, existingEmailUser) => {
      if (err) { return done(err) }
      if (existingEmailUser) {
        // req.flash('errors', { msg: 'There is already an account using this email address. Sign in to that account and link it with Facebook manually from Account Settings.' })
        done(err)
      } else {
        const user = new User()
        user.email = profile._json.email
        user.facebook = profile.id
        // user.tokens.push({ kind: 'facebook', accessToken })
        user.profile.displayName = profile.displayName || `${profile.name.givenName} ${profile.name.familyName}`
        user.profile.picture = `https://graph.facebook.com/${profile.id}/picture?type=large`
        user.save((err) => {
          done(err, user)
        })
      }
    })
  })
}))
