export interface CreateArticleInDTO {
	article: Article
}

interface Article {
	slug: string
	title: string
	body: string
	tagList: string[]
	createdAt: string
	updatedAt: string
	favorited: boolean
	favoritesCount: number
	author: Author
}

interface Author {
	username: string
	bio: string
	image: string
	following: boolean
}
