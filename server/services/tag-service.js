import Tag from '../models/tag-model.js'
import Article from '../models/article-model.js'

class TagService {
	async createTag(tagList) {
		const tagsId = await Promise.all(
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
		return tagsId
	}

	async addTagToArticle(articleId, tagListId) {
		return await Article.findByIdAndUpdate(
			articleId,
			{ tags: tagListId },
			{ new: true, useFindAndModify: false }
		)
	}

	async addArticleToTag(tagsId, articleId) {
		return await Promise.all(
			tagsId.map(async tagId => {
				await Tag.findByIdAndUpdate(
					tagId._id,
					{ $push: { articles: articleId } },
					{ new: true, useFindAndModify: false }
				)
			})
		)
	}
}

export default new TagService()
