import React from 'react'
import { Route, Routes, useMatch, useNavigate } from 'react-router-dom'
import { Header } from './common/components/header/header'
import { routes } from './core/routes'
import { useAuth } from './modules/auth/hooks/use-auth'

export const App: React.FC = () => {
	const { isLoggedIn } = useAuth()
	const isGlobalFeedPage = useMatch(routes.globalFeed.path)
	const navigate = useNavigate()

	// React.useEffect(() => {
	// 	if (isGlobalFeedPage && isLoggedIn) {
	// 		navigate(routes.personalFeed.path)
	// 	}
	// }, [])

	return (
		<div className='pb-16'>
			<Header />
			<Routes>
				{Object.values(routes).map(route => {
					if (route.private) {
						return (
							<Route
								key={`route-${route.path}`}
								path={route.path}
								element={<route.Element />}
							/>
						)
					}
					return (
						<Route
							key={`route-${route.path}`}
							path={route.path}
							element={<route.Element />}
						/>
					)
				})}
			</Routes>
		</div>
	)
}
