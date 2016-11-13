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
  // req.assert('email', 'Email is not valid').isEmail()
  // req.assert('password', 'Password must be at least 4 characters long').len(4)
  // req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password)
  // req.sanitize('email').normalizeEmail({ remove_dots: false })

  // const errors = req.validationErrors()
  const errors = null

  if (errors) {
    // req.flash('errors', errors)
    return res.redirect('/signup')
  }

  const user = new User({
    email: req.body.email,
    password: req.body.password,
  })

  User.findOne({ email: req.body.email }, (err, existingUser) => {
    if (err) { return next(err) }
    if (existingUser) {
      // req.flash('errors', { msg: 'Account with that email address already exists.' })
      return res.redirect('/signup')
    }
    user.save((err, savedUser) => {
      if (err) { return next(err) }

      req.user = {
        _id: savedUser._id,
        email: savedUser.email,
        profile: {
          type: savedUser.profile.type,
          displayName: savedUser.profile.displayName,
          picture: savedUser.profile.picture,
        },
      }
      req.token = generateToken(req.user)
      // res.status(200).json({
      //   user: req.user,
      //   token: req.token,
      // })
      res.cookie('AUTH_TOKEN', req.token, {
        maxAge: 60 * 30 * 1000,
        // httpOnly: true
      })
      res.redirect('/')
    })
  })
}

exports.login = (req, res, next) => {
  // req.assert('email', 'Email is not valid').isEmail()
  // req.assert('password', 'Password cannot be blank').notEmpty()
  // req.sanitize('email').normalizeEmail({ remove_dots: false })

  // const errors = req.validationErrors()
  const errors = null

  if (errors) {
    // req.flash('errors', errors)
    return res.redirect('/login')
  }

  passport.authenticate('local', {
    session: false,
  }, (err, user, info) => {
    if (err) { return next(err) }
    if (!user) {
      // req.flash('errors', info)
      return res.redirect('/login')
    }
    console.log(req.isAuthenticated())
    console.log(req.user)
    req.logIn(user, (err) => {
      if (err) { return next(err) }
      // req.flash('success', { msg: 'Success! You are logged in.' })
      console.log(req.isAuthenticated())
      console.log(req.user)
      res.redirect(req.session.returnTo || '/')
    })
  })(req, res, next)
}

exports.logout = (req, res) => {
  req.logout()
  res.redirect('/')
}
