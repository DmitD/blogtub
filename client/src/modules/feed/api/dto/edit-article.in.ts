export interface EditArticleInDTO {
	article: Article
}

interface Article {
	slug: string
	title: string
	body: string
	tagList: string[]
	createdAt: string
	favorited: boolean
	favoritesCount: number
	author: Author
}

interface Author {
	id: string
	username: string
	email: string
	image?: string
	isActivated: boolean
	following?: boolean
}
