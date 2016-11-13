import express from 'express'
import passport from 'passport'
import userController from 'server/controllers/user'
import passportConfig from 'server/config/passport'

const requiredSignin = passport.authenticate('local', { session: false })

const router = express.Router()

router.post('/signup', userController.signup)
router.post('/login', requiredSignin, userController.login)
router.get('/logout', userController.logout)

export default router
