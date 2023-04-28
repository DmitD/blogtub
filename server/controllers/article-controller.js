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
		res.status(409).json({ message: error.message }) // переделать
	}
}

export const getArticle = async (req, res, next) => {
	try {
		const { slug } = req.params
		const article = await ArticleService.getArticle(slug, req.userId)
		res.json({ article })
	} catch (error) {
		res.status(409).json({ message: error.message })
	}
}

export const getArticles = async (req, res, next) => {
	try {
		const result = await ArticleService.getArticles(req.query, req.userId)
		res.json(result)
	} catch (error) {
		res.status(409).json({ message: error.message })
	}
}

export const getArticlesFeed = async (req, res, next) => {
	try {
		const result = await ArticleService.getArticlesFeed(req.query, req.userId)
		res.json(result)
	} catch (error) {
		res.status(409).json({ message: error.message })
	}
}

export const favoriteArticle = async (req, res, next) => {
	try {
		const { slug } = req.params
		const article = await ArticleService.favoriteArticle(slug, req.userId)
		res.json({ article })
	} catch (error) {
		res.status(409).json({ message: error.message })
	}
}

export const unfavoriteArticle = async (req, res, next) => {
	try {
		const { slug } = req.params
		const article = await ArticleService.unfavoriteArticle(slug, req.userId)
		res.json({ article })
	} catch (error) {
		res.status(409).json({ message: error.message })
	}
}

export const updateArticle = async (req, res, next) => {
	try {
		const { slug } = req.params
		const { title, body, tagList } = req.body.article
		const article = await ArticleService.updateArticle(
			slug,
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

export const deleteArticle = async (req, res, next) => {
	try {
		const { slug } = req.params
		await ArticleService.deleteArticle(slug, req.userId)
		res.json({ message: 'Article deleted successfully' })
	} catch (error) {
		res.status(409).json({ message: error.message })
	}
}
