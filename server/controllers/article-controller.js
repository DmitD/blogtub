import mongoose from 'mongoose'
import Article from '../models/article-model.js'
import ArticleService from '../services/article-service.js'

export const createArticle = async (req, res, next) => {
	try {
		const { title, body, tagList } = req.body.article
		const article = await ArticleService.createArticle(
			title,
			body,
			tagList,
			req.userId
		)
		res.json({ article })
	} catch (error) {
		res.status(409).json({ message: error.message })
	}
}

export const getArticle = async (req, res, next) => {
	try {
		const { slug } = req.params
		const article = await ArticleService.getArticle(slug)
		res.json({ article })
	} catch (error) {
		res.status(409).json({ message: error.message })
	}
}
