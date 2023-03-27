export default class ArticleDto {
	slug
	title
	body
	tagList
	createdAt
	favorited
	favoritesCount

	constructor(model, userId) {
		this.slug = model.slug
		this.title = model.title
		this.body = model.body
		this.tagList = model.tags.map(tag => tag.name)
		this.createdAt = model.createdAt
		this.favorited = userId
			? model.favoritedBy.some(id => id === userId)
			: false
		this.favoritesCount = model.favoritedBy.length
	}
}
