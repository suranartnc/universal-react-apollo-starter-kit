import express from 'express'
import passport from 'passport'
import userController from '../controllers/user'
import passportConfig from '../config/passport'

const requiredSignin = passport.authenticate('local', { session: false })
const requiredFacebookSignin = passport.authenticate('facebook', { scope: 'email' })
const logFacebookUserIn = passport.authenticate('facebook', {
  failureRedirect: '/login',
  session: false,
})

const router = express.Router()

router.post('/api/signup', userController.signup)
router.post('/api/login', requiredSignin, userController.login)

router.get('/api/auth/facebook', requiredFacebookSignin)
router.get('/api/auth/facebook/callback', logFacebookUserIn, userController.login)

export default router
