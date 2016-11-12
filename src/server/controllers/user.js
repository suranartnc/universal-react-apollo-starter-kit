import jwt from 'jsonwebtoken'
import passport from 'passport'
import User from 'server/data/models/UserModel'

const secretKey = 'u0rewhgpi43h-9thgr4g'

function generateToken(user) {
  const token = jwt.sign({
    sub: user._id,
    name: user.name,
    avatar: user.avatar || 'https://s3.amazonaws.com/uifaces/faces/twitter/alxleroydeval/128.jpg',
    iat: new Date().getTime(),
  }, secretKey)
  return token
}

exports.postSignup = (req, res, next) => {
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
    user.save((err) => {
      if (err) { return next(err) }
      // req.logIn(user, (err) => {
      //   if (err) {
      //     return next(err)
      //   }
      //   res.redirect('/')
      // })
      // const token = generateToken(user)
      // res.json({ token })

      res.cookie('AUTH_TOKEN', generateToken({ email: user.email }), {
        maxAge: 60 * 30 * 1000,
        // httpOnly: true
      })
      res.redirect('/')
    })
  })
}

exports.postLogin = (req, res, next) => {
  // req.assert('email', 'Email is not valid').isEmail()
  // req.assert('password', 'Password cannot be blank').notEmpty()
  // req.sanitize('email').normalizeEmail({ remove_dots: false })

  // const errors = req.validationErrors()
  const errors = null

  if (errors) {
    req.flash('errors', errors)
    return res.redirect('/login')
  }

  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err) }
    if (!user) {
      req.flash('errors', info)
      return res.redirect('/login')
    }
    req.logIn(user, (err) => {
      if (err) { return next(err) }
      req.flash('success', { msg: 'Success! You are logged in.' })
      res.redirect(req.session.returnTo || '/')
    })
  })(req, res, next)
}

exports.logout = (req, res) => {
  req.logout()
  res.redirect('/')
}
