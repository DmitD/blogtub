import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Header } from './common/components/header/header'
import { ArticlePage } from './modules/feed/pages/article.page'
import { GlobalFeedPage } from './modules/feed/pages/global-feed.page'
import { ProfilePage } from './modules/profile/pages/profile.page'

export const App: React.FC = () => {
	return (
		<div className='pb-16'>
			<Header />
			<Routes>
				<Route path='/' element={<GlobalFeedPage />} />
				<Route path='/:profile' element={<ProfilePage />} />
				<Route path='/:profile/favorites' element={<ProfilePage />} />
				<Route path='/article/:slug' element={<ArticlePage />} />
			</Routes>
		</div>
	)
}
