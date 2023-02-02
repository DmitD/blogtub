import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { Container } from '../../../common/components/container/container'
import { useGetProfileFeedQuery } from '../../feed/api/repository'
import { FeedToggle } from '../../feed/components/feed-toggle/feed-toggle'
import { Feed } from '../../feed/components/feed/feed'
import { usePageParam } from '../../feed/hooks/use-page-param'
import { useGetProfileQuery } from '../api/repository'
import { ProfileInfo } from '../components/profile-info/profile-info'

interface ProfilePageProps {}

export const ProfilePage: React.FC = () => {
	const { page } = usePageParam()
	const { profile } = useParams()
	const { pathname } = useLocation()

	const { data: profileData, isLoading: profileLoading } = useGetProfileQuery({
		username: profile!,
	})

	const { data, isLoading, isFetching, error } = useGetProfileFeedQuery({
		page,
		author: profile!,
		isFavorite: pathname.includes(`/${encodeURIComponent(profile!)}/favorites`),
	})

	const feedToggleItems = [
		{
			text: 'Favorited articles',
			link: `/${encodeURIComponent(profile!)}/favorites`,
		},
	]

	if (profileLoading) {
		return null
	}

	return (
		<Container>
			<div className='flex flex-row justify-between mt-8'>
				<div className='max-w-[728px] min-w-[728px]'>
					<FeedToggle
						defaultText='Articles'
						defaultLink={`/${encodeURIComponent(profile!)}`}
						items={feedToggleItems}
					/>
					<Feed
						data={data}
						error={error}
						isLoading={isLoading}
						isFetching={isFetching}
					/>
				</div>
				<div className='max-w-[368px] min-w-[368px]'>
					<ProfileInfo profile={profileData!.profile} />
				</div>
			</div>
		</Container>
	)
}
