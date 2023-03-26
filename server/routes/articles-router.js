import express from 'express'
import authMiddleware from '../middlewares/auth-middleware.js'
import { createArticle, getArticle } from '../controllers/article-controller.js'

const router = express.Router()

router.post('/', authMiddleware, createArticle)
router.get('/:slug', getArticle)

export default router
