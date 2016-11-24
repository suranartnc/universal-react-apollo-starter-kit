import express from 'express'
import passport from 'passport'
import userController from '../controllers/user'
import passportConfig from '../config/passport'

const requiredSignin = passport.authenticate('local', { session: false })

const router = express.Router()

router.post('/api/signup', userController.signup)
router.post('/api/login', requiredSignin, userController.login)

export default router
