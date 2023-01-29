import React from 'react'
import { Banner } from '../../../common/components/banner/banner'
import { Feed } from '../components/feed/feed'

export const GlobalFeedPage: React.FC = () => {
	return (
		<>
			<Banner />
			<Feed />
		</>
	)
}
