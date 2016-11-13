import jwt from 'jsonwebtoken'
import passport from 'passport'
import User from 'server/data/models/UserModel'

const secretKey = 'u0rewhgpi43h-9thgr4g'

function generateToken(user) {
  const token = jwt.sign({
    sub: user._id,
    email: user.email,
    profile: {
      type: user.profile.type,
      displayName: user.profile.displayName,
      picture: user.profile.picture,
    },
    iat: new Date().getTime(),
  }, secretKey)
  return token
}

exports.signup = (req, res, next) => {

  const errors = null
  if (errors) {
    return res.redirect('/signup')
  }

  const user = new User({
    email: req.body.email,
    password: req.body.password,
  })

  User.findOne({ email: req.body.email }, (err, existingUser) => {
    if (err) { return next(err) }
    if (existingUser) {
      return res.redirect('/signup')
    }
    user.save((err, savedUser) => {
      if (err) { return next(err) }
      res.redirect('/login')
    })
  })
}

exports.login = (req, res, next) => {

  const errors = null
  if (errors) {
    return res.redirect('/login')
  }

  passport.authenticate('local', {
    session: false,
  }, (err, user, info) => {
    if (err) { return next(err) }
    if (!user) {
      return res.redirect('/login')
    }
    req.logIn(user, (err) => {
      if (err) { return next(err) }
      const token = generateToken(req.user)
      res.cookie('AUTH_TOKEN', token, {
        maxAge: 60 * 30 * 1000,
        // httpOnly: true
      })
      res.redirect(req.session.returnTo || '/')
    })
  })(req, res, next)
}

exports.logout = (req, res) => {
  req.logout()
  res.redirect('/')
}
