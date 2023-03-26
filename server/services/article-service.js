import slugify from 'slugify'
import Article from '../models/article-model.js'
import User from '../models/user-model.js'
import UserService from '../services/user-service.js'
import TagService from './tag-service.js'
import UserDto from '../dtos/user-dto.js'
import ApiError from '../exceptions/apiError.js'

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
			createdAt: new Date().toISOString(),
			authorId: userId,
		})

		const tagsId = await TagService.createTag(tagList)
		const articleWithTags = await TagService.addTagToArticle(
			newArticle._id,
			tagsId
		)
		await TagService.addArticleToTag(tagsId, newArticle._id)
		// const articleWithTags = await Article.findById(newArticle._id).populate(
		// 	'tags'
		// )

		await UserService.addArticleToUser(userId, newArticle._id)
		const existingUser = await User.findById(userId)
		const userDto = new UserDto(existingUser)

		const fullArticle = {
			data: articleWithTags,
			favorited: false,
			favoritesCount: 0,
			author: userDto,
		}

		return fullArticle
	}

	async getArticle(slug) {
		const article = await Article.findOne({ slug: slug })
		if (!article) {
			throw ApiError.UnprocessableEntity('Not found')
		}
		const existingUser = await User.findById(article.authorId)
		const userDto = new UserDto(existingUser)

		const fullArticle = {
			data: article,
			favorited: false,
			favoritesCount: 0,
			author: userDto,
		}

		return fullArticle
	}
}

export default new ArticleService()
