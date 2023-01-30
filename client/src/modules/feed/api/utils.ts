import { GlobalFeedDTO } from './dto/global-feed.in'

// may not be used
export const transformResponse = (response: GlobalFeedDTO) => {
	return {
		articles: response.articles || [],
		articlesCount: response.articlesCount || 0,
	}
}
