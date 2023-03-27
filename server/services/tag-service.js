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
				await Tag.findByIdAndUpdate(
					tag._id,
					{ $push: { articles: articleId } },
					{ new: true, useFindAndModify: false }
				)
			})
		)
	}
}

export default new TagService()
