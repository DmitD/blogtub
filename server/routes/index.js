import express from 'express'
import userRouter from './user-router.js'
import articlesRouter from './articles-router.js'
import profilesRouter from './profiles-router.js'
import tagRouter from './tag-router.js'

const router = express.Router()

router.use('/user', userRouter)
router.use('/articles', articlesRouter)
router.use('/profiles', profilesRouter)
router.use('/tags', tagRouter)

export default router
