import express from 'express'
import authMiddleware from '../middlewares/auth-middleware.js'
import authOptional from '../middlewares/auth-optional.js'
import {
	createArticle,
	favoriteArticle,
	getArticle,
	getArticles,
	getArticlesFeed,
	unfavoriteArticle,
	updateArticle,
} from '../controllers/article-controller.js'

const router = new express.Router()

router.post('/', authMiddleware, createArticle)
router.get('/:slug', authOptional, getArticle)
router.get('/feed', authMiddleware, getArticlesFeed)
router.get('/', authOptional, getArticles)
router.post('/:slug/favorite', authMiddleware, favoriteArticle)
router.delete('/:slug/favorite', authMiddleware, unfavoriteArticle)
router.put('/:slug', authMiddleware, updateArticle)

export default router
