import express from 'express'

import config from '../config.js'

import signin from '../controllers/auth/signin.js'
import signup from '../controllers/auth/signup.js'
import reset from '../controllers/auth/reset.js'
import reset_link from '../controllers/auth/reset_link.js'
import new_password from '../controllers/auth/new_password.js'
import get_user from '../controllers/auth/get_user.js'
import check_user from '../controllers/auth/check_user.js'
import { 
    change_name,
    change_email,
    change_avatar
} from '../controllers/auth/changers.js'

const router = express.Router()

router.post(config.urls.signin, signin)
router.post(config.urls.signup, signup)
router.post(config.urls.reset, reset)
router.get(config.urls.reset_link + ':id', reset_link)
router.post(config.urls.new_password + ':id', new_password)

router.use(check_user)

router.post(config.urls.change_name, change_name)
router.post(config.urls.change_email, change_email)
router.post(config.urls.change_avatar, change_avatar)

router.post(config.urls.get_user, get_user)

export default router