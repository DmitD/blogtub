import React from 'react'
import { Container } from '../../../../common/components/container/container.component'
import { ArticleList } from '../article-list/article-list.component'
import { FeedToggle } from '../feed-toggle/feed-toggle.components'

export const Feed: React.FC = () => {
	return (
		<Container>
			<FeedToggle />
			<div className='flex'>
				<ArticleList />
				<div className='w-1/3'>Tags</div>
			</div>
		</Container>
	)
}
