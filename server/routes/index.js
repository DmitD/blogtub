import express from 'express'
import userRouter from './user-router.js'
import articlesRouter from './articles-router.js'

const router = express.Router()

router.use('/user', userRouter)
router.use('/articles', articlesRouter)

export default router
