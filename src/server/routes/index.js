import express from 'express'
import passport from 'passport'
import userController from '../controllers/user'
import passportConfig from 'server/config/passport'

const requiredSignin = passport.authenticate('local', { session: false })

const router = express.Router()

router.post('/signup', userController.signup)
router.post('/login', requiredSignin, userController.login)

export default router
