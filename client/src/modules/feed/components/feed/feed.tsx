import React from 'react'
import { Container } from '../../../../common/components/container/container'
import { useGetGlobalFeedQuery } from '../../api/repository'
import { ArticleList } from '../article-list/article-list'
import { FeedToggle } from '../feed-toggle/feed-toggle'

export const Feed: React.FC = () => {
	const { data, error, isLoading } = useGetGlobalFeedQuery('')

	if (isLoading) {
		return <Container>Feed Loading...</Container>
	}

	if (error) {
		return <Container>Error while loading feed</Container>
	}

	return (
		<Container>
			<FeedToggle />
			<div className='flex flex-row justify-between'>
				<ArticleList list={data?.articles || []} />
				<div className='max-w-[368px] min-w-[368px]'>Tags</div>
			</div>
		</Container>
	)
}
