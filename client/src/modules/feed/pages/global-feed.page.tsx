import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { Banner } from '../../../common/components/banner/banner'
import { useGetGlobalFeedQuery } from '../api/repository'
import { Feed } from '../components/feed/feed'

export const GlobalFeedPage: React.FC = () => {
	const [searchParams] = useSearchParams()
	const page = searchParams.get('page') ? Number(searchParams.get('page')) : 0

	const { data, error, isLoading, isFetching } = useGetGlobalFeedQuery({
		page,
		tag: searchParams.get('tag'),
	})

	return (
		<>
			<Banner />
			<Feed
				data={data}
				error={error}
				isLoading={isLoading}
				isFetching={isFetching}
			/>
		</>
	)
}
