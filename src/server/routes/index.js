import express from 'express'
import passport from 'passport'

import userController from 'server/controllers/user'
import passportConfig from 'server/config/passport'

const router = express.Router()

router.post('/signup', userController.signup)

router.post('/login', userController.login)

router.get('/logout', userController.logout)

export default router
