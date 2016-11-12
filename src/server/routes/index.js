import express from 'express'
// import passport from 'passport'

import userController from 'server/controllers/user'
// import passportConfig from 'server/config/passport'

const router = express.Router()

// router.post('/login', userController.postLogin)
// router.get('/logout', userController.logout)
router.post('/signup', userController.postSignup)

export default router
