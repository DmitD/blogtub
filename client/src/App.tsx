import React from 'react'
import { Banner } from './common/components/banner/banner'
import { Header } from './common/components/header/header'
import { Feed } from './modules/feed/components/feed/feed'

export const App: React.FC = () => {
	return (
		<div className='pb-16'>
			<Header />
			<Banner />
			<Feed />
		</div>
	)
}
