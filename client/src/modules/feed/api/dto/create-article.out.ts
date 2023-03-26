export interface CreateArticleOutDTO {
	article: Article
}

interface Article {
	title: string
	body: string
	tagList: string[]
}
