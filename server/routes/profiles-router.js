import express from 'express'
import {
	followUser,
	getProfile,
	unfollowUser,
} from '../controllers/profile-controller.js'
import authMiddleware from '../middlewares/auth-middleware.js'
import authOptional from '../middlewares/auth-optional.js'

const router = new express.Router()

router.get('/:username', authOptional, getProfile)
router.post('/:username/follow', authMiddleware, followUser)
router.delete('/:username/follow', authMiddleware, unfollowUser)

export default router
