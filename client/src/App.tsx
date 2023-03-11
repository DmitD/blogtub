import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Header } from './common/components/header/header'
import { routes } from './core/routes'

export const App: React.FC = () => {
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
