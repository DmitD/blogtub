import express from 'express'
import { body } from 'express-validator'
import {
	signup,
	activate,
	signin,
	logout,
	refresh,
	signinGoogle,
	refreshGoogle,
} from '../controllers/user-controller.js'

const router = express.Router()

router.post(
	'/signup',
	body('email').isEmail(),
	body('password').isLength({ min: 3, max: 16 }),
	signup
)
router.get('/activate/:link', activate)
router.post('/login', signin)
router.post('/logout', logout)
router.get('/refresh-token', refresh)
router.post('/login-google', signinGoogle)
router.get('/refresh-google-token', refreshGoogle)

export default router
