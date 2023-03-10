import { createApi } from '@reduxjs/toolkit/query/react'
import { blogtubBaseQuery } from '../../../core/blogtub-base-query'
import { transformResponse } from './utils'
import { FEED_PAGE_SIZE } from '../consts'
import { FeedArticle } from './dto/global-feed.in'
import { TagCloudDTO } from './dto/tag-cloud.in'
import { ArticleDTO } from './dto/article.in'
import { ArticleCommentDTO } from './dto/article-comment.in'

interface BaseFeedParams {
	page: number
}

interface GlobalFeedParams extends BaseFeedParams {
	tag: string | null
}

export interface FeedData {
	articles: FeedArticle[]
	articlesCount: number
}

interface ProfileFeedParams extends BaseFeedParams {
	author: string
	isFavorite?: boolean
}

interface ArticleParams {
	slug: string
}

export const feedApi = createApi({
	reducerPath: 'feedApi',
	baseQuery: blogtubBaseQuery,
	endpoints: builder => ({
		getGlobalFeed: builder.query<FeedData, GlobalFeedParams>({
			query: ({ page, tag }) => ({
				url: '/articles',
				method: 'get',
				params: {
					limit: FEED_PAGE_SIZE,
					offset: page * FEED_PAGE_SIZE,
					tag,
				},
			}),
			transformResponse,
		}),

		getProfileFeed: builder.query<FeedData, ProfileFeedParams>({
			query: ({ page, author, isFavorite = false }) => ({
				url: '/articles',
				method: 'get',
				params: {
					limit: FEED_PAGE_SIZE,
					offset: page * FEED_PAGE_SIZE,
					author: isFavorite ? undefined : author,
					favorited: !isFavorite ? undefined : author,
				},
			}),
			transformResponse,
		}),

		getArticle: builder.query<ArticleDTO, ArticleParams>({
			query: ({ slug }) => ({
				url: `/articles/${slug}`,
				method: 'get',
			}),
		}),

		getArticleComments: builder.query<ArticleCommentDTO, ArticleParams>({
			query: ({ slug }) => ({
				url: `/articles/${slug}/comments`,
				method: 'get',
			}),
		}),

		getTagCloud: builder.query<TagCloudDTO, any>({
			query: () => ({
				url: '/tags',
				method: 'get',
			}),
		}),
	}),
})

export const {
	useGetGlobalFeedQuery,
	useGetTagCloudQuery,
	useGetProfileFeedQuery,
	useGetArticleQuery,
	useGetArticleCommentsQuery,
} = feedApi // autogenerated hook
