import Tag from '../models/tag-model.js'
import Article from '../models/article-model.js'

class TagService {
	async createTag(tagList) {
		const tags = await Promise.all(
			tagList.map(async tag => {
				const existingTag = await Tag.findOne({ name: tag })
				if (existingTag) {
					return { _id: existingTag._id, name: existingTag.name }
				} else {
					const newTag = await Tag.create({ name: tag })
					return { _id: newTag._id, name: newTag.name }
				}
			})
		)
		return tags
	}

	async addTagToArticle(articleId, tagList) {
		return await Article.findByIdAndUpdate(
			articleId,
			{ tags: tagList },
			{ new: true, useFindAndModify: false }
		)
	}

	async addArticleToTag(tags, articleId) {
		return await Promise.all(
			tags.map(async tag => {
				const existingTagWithArticle = await Tag.findOne({
					articles: articleId,
				})
				if (existingTagWithArticle) {
					return
				} else {
					await Tag.findByIdAndUpdate(
						tag._id,
						{ $push: { articles: articleId } },
						{ new: true, useFindAndModify: false }
					)
				}
			})
		)
	}

	async deleteArticleFromTag(tags, articleId) {
		await Promise.all(
			tags.map(async tag => {
				const existingTagWithArticle = await Tag.findOne({
					name: tag,
				})
				await Tag.findByIdAndUpdate(
					existingTagWithArticle._id,
					{ $pull: { articles: articleId } },
					{ new: true, useFindAndModify: false }
				)
			})
		)
	}

	async getTagCloud() {
		const tagList = await Tag.find().limit(10)
		return tagList.map(tag => tag.name)
	}
}

export default new TagService()
