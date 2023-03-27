export interface EditArticleOutDTO {
	article: Article
}

interface Article {
	title: string
	body: string
	tagList: string[]
}
