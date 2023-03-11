import React from 'react'
import { useMatch, useSearchParams } from 'react-router-dom'
import { Banner } from '../../../common/components/banner/banner'
import { Container } from '../../../common/components/container/container'
import { routes } from '../../../core/routes'
import { useAuth } from '../../auth/hooks/use-auth'
import { useGetGlobalFeedQuery } from '../api/repository'
import { FeedToggle } from '../components/feed-toggle/feed-toggle'
import { Feed } from '../components/feed/feed'
import { RecentPosts } from '../components/recent-posts/recent-posts'
import { Social } from '../components/social/social'
import { TagCloud } from '../components/tag-cloud/tag-cloud'
import { usePageParam } from '../hooks/use-page-param'

export const GlobalFeedPage: React.FC = () => {
	const { isLoggedIn } = useAuth()
	const personalFeed = useMatch(routes.personalFeed.path)

	const [searchParams] = useSearchParams()
	const { page } = usePageParam()

	const { data, error, isLoading, isFetching } = useGetGlobalFeedQuery({
		page,
		tag: searchParams.get('tag'),
		isPersonalFeed: personalFeed !== null,
	})

	const feedToggleItems = []
	if (isLoggedIn) {
		feedToggleItems.push({
			text: 'Your feed',
			link: '/personal-feed',
		})
	}

	return (
		<>
			{!isLoggedIn && <Banner />}
			<Container>
				<div className='flex flex-row justify-between mt-8'>
					<div className='max-w-[728px] min-w-[728px]'>
						<FeedToggle items={feedToggleItems} />
						<Feed
							data={data}
							error={error}
							isLoading={isLoading}
							isFetching={isFetching}
						/>
					</div>
					<div className='max-w-[368px] min-w-[368px]'>
						<RecentPosts posts={data?.articles.slice(0, 4) || []} />
						<TagCloud />
						<Social />
					</div>
				</div>
			</Container>
		</>
	)
}
