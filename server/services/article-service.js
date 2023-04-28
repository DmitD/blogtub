import slugify from 'slugify'
import Article from '../models/article-model.js'
import User from '../models/user-model.js'
import UserService from '../services/user-service.js'
import TagService from './tag-service.js'
import ArticleDto from '../dtos/article-dto.js'
import UserDto from '../dtos/user-dto.js'
import ApiError from '../exceptions/api-error.js'

class ArticleService {
	async createArticle(title, body, tagList, userId) {
		if (!title) {
			throw ApiError.UnprocessableEntity(`Title can't be blank`)
		}
		if (!body) {
			throw ApiError.UnprocessableEntity(`Body can't be blank`)
		}
		if (!tagList) {
			throw ApiError.UnprocessableEntity(`Tags can't be blank`)
		}

		const slug = `${slugify(title)}-${userId}`

		const existingTitle = await Article.findOne({ slug })
		if (existingTitle) {
			throw ApiError.UnprocessableEntity('Title must be unique')
		}

		const newArticle = await Article.create({
			title,
			body,
			slug,
			authorId: userId,
		})

		const tags = await TagService.createTag(tagList)
		const articleWithTags = await TagService.addTagToArticle(
			newArticle._id,
			tags
		)
		await TagService.addArticleToTag(tags, newArticle._id)

		const articleDto = new ArticleDto(articleWithTags)

		await UserService.addArticleToUser(userId, newArticle._id)
		const existingAuthor = await User.findById(userId)
		const authorDto = new UserDto(existingAuthor)

		return {
			...articleDto,
			author: authorDto,
		}
	}

	async getArticle(slug, userId) {
		const article = await Article.findOne({ slug: slug })

		if (!article) {
			throw ApiError.UnprocessableEntity('Not found')
		}

		const articleDto = new ArticleDto(article, userId)

		const existingAuthor = await User.findById(article.authorId)
		const authorDto = new UserDto(existingAuthor)

		const fullArticle = {
			...articleDto,
			author: authorDto,
		}

		return fullArticle
	}

	async getArticles(query, userId) {
		if (query.tag && query.tag !== 'null') {
			const pageOptions = {
				skip: Number(query.offset) || 0,
				limit: Number(query.limit) || 10,
			}

			const articlesCount = await Article.countDocuments({
				'tags.name': `${query.tag}`,
			})

			const findArticles = await Article.find({ 'tags.name': `${query.tag}` })
				.sort({ createdAt: 'desc' })
				.limit(pageOptions.limit)
				.skip(pageOptions.skip)

			const articles = await Promise.all(
				findArticles.map(async article => {
					const existingAuthor = await User.findById(article.authorId)
					const authorDto = new UserDto(existingAuthor)
					const articleDto = new ArticleDto(article, userId)
					return {
						...articleDto,
						author: authorDto,
					}
				})
			)

			return {
				articles,
				articlesCount,
			}
		}

		if (query.author) {
			const pageOptions = {
				skip: Number(query.offset) || 0,
				limit: Number(query.limit) || 10,
			}

			const author = await User.findOne({ username: query.author })

			const articlesCount = await Article.countDocuments({
				authorId: author._id,
			})

			const findArticles = await Article.find({
				authorId: author._id,
			})
				.sort({ createdAt: 'desc' })
				.limit(pageOptions.limit)
				.skip(pageOptions.skip)

			const articles = await Promise.all(
				findArticles.map(async article => {
					const existingAuthor = await User.findById(article.authorId)
					const authorDto = new UserDto(existingAuthor)
					const articleDto = new ArticleDto(article, userId)
					return {
						...articleDto,
						author: authorDto,
					}
				})
			)

			return {
				articles,
				articlesCount,
			}
		}

		if (query.favorited) {
			const pageOptions = {
				skip: Number(query.offset) || 0,
				limit: Number(query.limit) || 10,
			}

			const user = await User.findOne({ username: query.favorited })

			const articlesCount = await Article.countDocuments({
				favoritedBy: user._id,
			})

			const findArticles = await Article.find({
				favoritedBy: user._id,
			})
				.sort({ createdAt: 'desc' })
				.limit(pageOptions.limit)
				.skip(pageOptions.skip)

			const articles = await Promise.all(
				findArticles.map(async article => {
					const existingAuthor = await User.findById(article.authorId)
					const authorDto = new UserDto(existingAuthor)
					const articleDto = new ArticleDto(article, userId)
					return {
						...articleDto,
						author: authorDto,
					}
				})
			)

			return {
				articles,
				articlesCount,
			}
		}

		const pageOptions = {
			skip: Number(query.offset) || 0,
			limit: Number(query.limit) || 10,
		}

		const articlesCount = await Article.countDocuments({})

		const findArticles = await Article.find()
			.sort({ createdAt: 'desc' })
			.limit(pageOptions.limit)
			.skip(pageOptions.skip)

		const articles = await Promise.all(
			findArticles.map(async article => {
				const existingAuthor = await User.findById(article.authorId)
				const authorDto = new UserDto(existingAuthor)
				const articleDto = new ArticleDto(article, userId)
				return {
					...articleDto,
					author: authorDto,
				}
			})
		)

		return {
			articles,
			articlesCount,
		}
	}

	async getArticlesFeed(query, userId) {
		const pageOptions = {
			skip: Number(query.offset) || 0,
			limit: Number(query.limit) || 10,
		}

		const user = await User.findById(userId)

		const articles = await Promise.all(
			user.following.map(async id => {
				const findArticles = await Article.find({ authorId: id })
					.sort({ createdAt: 'desc' })
					.limit(pageOptions.limit)
					.skip(pageOptions.skip)

				const findAuthor = await User.findById(id)

				const userArticles = findArticles.map(article => {
					const articleDto = new ArticleDto(article, id)
					const authorDto = new UserDto(findAuthor)
					return {
						...articleDto,
						author: authorDto,
					}
				})
				return userArticles
			})
		)
		return { articles: articles.flat() }
	}

	async favoriteArticle(slug, userId) {
		const existingArticle = await Article.findOne({ slug: slug })
		existingArticle.favoritedBy.push(userId)
		const updatedArticle = await Article.findByIdAndUpdate(
			existingArticle._id,
			existingArticle,
			{
				new: true,
			}
		)
		const articleDto = new ArticleDto(updatedArticle, userId)

		const authorArticle = await User.findById(existingArticle.authorId)
		const authorDto = new UserDto(authorArticle)

		return {
			...articleDto,
			author: authorDto,
		}
	}

	async unfavoriteArticle(slug, userId) {
		const existingArticle = await Article.findOne({ slug: slug })
		existingArticle.favoritedBy = existingArticle.favoritedBy.filter(
			id => id !== String(userId)
		)
		const updatedArticle = await Article.findByIdAndUpdate(
			existingArticle._id,
			existingArticle,
			{
				new: true,
			}
		)
		const articleDto = new ArticleDto(updatedArticle, userId)

		const authorArticle = await User.findById(existingArticle.authorId)
		const authorDto = new UserDto(authorArticle)

		return {
			...articleDto,
			author: authorDto,
		}
	}

	async updateArticle(slug, title, body, tagList, userId) {
		const existingArticle = await Article.findOne({ slug: slug })

		if (!existingArticle) {
			throw ApiError.UnprocessableEntity('Not found')
		}
		if (!title) {
			throw ApiError.UnprocessableEntity(`Title can't be blank`)
		}
		if (!body) {
			throw ApiError.UnprocessableEntity(`Body can't be blank`)
		}
		if (!tagList) {
			throw ApiError.UnprocessableEntity(`Tags can't be blank`)
		}

		const updatedSlug = `${slugify(title)}-${userId}`
		const existingTitle = await Article.findOne({ slug: updatedSlug })
		if (existingTitle) {
			throw ApiError.UnprocessableEntity('Title must be unique')
		}

		const updatedArticle = await Article.findOneAndReplace(
			{ _id: existingArticle._id },
			{
				title,
				body,
				slug: updatedSlug,
				authorId: userId,
			},
			{ new: true }
		)

		const tags = await TagService.createTag(tagList)
		const updatedArticleWithTags = await TagService.addTagToArticle(
			updatedArticle._id,
			tags
		)
		await TagService.addArticleToTag(tags, updatedArticle._id)

		const articleDto = new ArticleDto(updatedArticleWithTags)

		await UserService.addArticleToUser(userId, updatedArticle._id)

		const existingAuthor = await User.findById(userId)
		const authorDto = new UserDto(existingAuthor)

		return {
			...articleDto,
			author: authorDto,
		}
	}

	async deleteArticle(slug, userId) {
		const existingArticle = await Article.findOne({ slug: slug })

		if (!existingArticle) {
			throw ApiError.UnprocessableEntity('Not found')
		}

		await TagService.deleteArticleFromTag(
			existingArticle.tags,
			existingArticle._id
		)

		await Article.findByIdAndRemove(existingArticle._id)
	}
}

export default new ArticleService()
