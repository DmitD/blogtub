import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from '../../../core/axios-base-query'
import { FEED_PAGE_SIZE } from '../consts'
import { GlobalFeedDTO } from './dto/global-feed.in'
import { TagCloudDTO } from './dto/tag-cloud.in'

interface GlobalFeedParams {
	page: number
	tag: string | null
}

export const feedApi = createApi({
	reducerPath: 'feedApi',
	baseQuery: axiosBaseQuery({
		baseUrl: 'https://api.realworld.io/api',
	}),
	endpoints: builder => ({
		getGlobalFeed: builder.query<GlobalFeedDTO, GlobalFeedParams>({
			query: ({ page, tag }) => ({
				url: '/articles',
				method: 'get',
				params: {
					limit: FEED_PAGE_SIZE,
					offset: page * FEED_PAGE_SIZE,
					tag,
				},
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

export const { useGetGlobalFeedQuery, useGetTagCloudQuery } = feedApi // autogenerated hook
