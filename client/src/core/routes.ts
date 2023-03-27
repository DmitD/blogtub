import React from 'react'
import { SignInPage } from '../modules/auth/pages/sign-in.page'
import { SignUpPage } from '../modules/auth/pages/sign-up.page'
import { ArticlePage } from '../modules/feed/pages/article.page'
import { EditorPage } from '../modules/feed/pages/editor.page'
import { GlobalFeedPage } from '../modules/feed/pages/global-feed.page'
import { ProfilePage } from '../modules/profile/pages/profile.page'

interface RouteItem {
	path: string
	Element: React.FC
	private?: boolean
}

export const routes: Record<string, RouteItem> = {
	globalFeed: {
		path: '/',
		Element: GlobalFeedPage,
	},
	personalFeed: {
		path: '/personal-feed',
		Element: GlobalFeedPage,
		private: true,
	},
	profile: {
		path: '/:profile',
		Element: ProfilePage,
	},
	profileFavorites: {
		path: '/:profile/favorites',
		Element: ProfilePage,
	},
	singleArticle: {
		path: '/articles/:slug',
		Element: ArticlePage,
	},
	signIn: {
		path: '/sign-in',
		Element: SignInPage,
	},
	signUp: {
		path: '/sign-up',
		Element: SignUpPage,
	},
	editor: {
		path: '/editor',
		Element: EditorPage,
	},
}
