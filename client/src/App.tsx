import React from 'react'
import { Banner } from './common/components/banner/banner.component'
import { Header } from './common/components/header/header.component'
import { Feed } from './modules/feed/components/feed/feed.component'

export const App: React.FC = () => {
	return (
		<div>
			<Header />
			<Banner />
			<Feed />
		</div>
	)
}
