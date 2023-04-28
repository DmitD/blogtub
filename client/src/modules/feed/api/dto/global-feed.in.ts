export interface GlobalFeedDTO {
	articles: FeedArticle[]
	articlesCount: number
}

export interface FeedArticle {
	slug: string
	title: string
	body: string
	tagList: string[]
	createdAt: string
	favorited: boolean
	favoritesCount: number
	author: Author
}

export interface Author {
	id: string
	username: string
	email: string
	image?: string
	isActivated: boolean
	following: boolean
}
