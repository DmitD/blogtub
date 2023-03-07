import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import clsx from 'clsx'
import { Container } from '../container/container'
import { useAuth } from '../../../modules/auth/hooks/use-auth'

export const Header: React.FC = () => {
	const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
		clsx('py-headerNavItem hover:text-theme-blue/60', {
			'text-theme-blue/30': !isActive,
			'text-theme-blue/80': isActive,
		})

	const { user, isLoggedIn, accessToken, checkAuth, checkAuthGoogle, logout } =
		useAuth()

	React.useEffect(() => {
		if (accessToken && accessToken.length < 500) {
			checkAuth()
		}
		if (accessToken && accessToken.length > 500) {
			if (user!.exp && user!.exp * 1000 < new Date().getTime()) {
				logout()
			}
			checkAuthGoogle()
		}
	}, [])

	return (
		<header>
			<nav className='px-2 py-4 bg-white'>
				<Container>
					<div className='flex justify-between items-center'>
						<Link to='/' className='text-2xl font-bold mr-8'>
							Blogtub
						</Link>
						<ul className='flex font-source list-none pl-0 mb-0'>
							<li>
								<NavLink to='/' className={navLinkClasses}>
									Home
								</NavLink>
							</li>
							{isLoggedIn ? (
								<>
									<li className='ml-4'>
										<NavLink
											to='/'
											className='py-headerNavItem hover:text-theme-blue/60'
											onClick={logout}
										>
											Log out
										</NavLink>
									</li>
								</>
							) : (
								<>
									<li className='ml-4'>
										<NavLink to='/sign-in' className={navLinkClasses}>
											Sign in
										</NavLink>
									</li>
									<li className='ml-4'>
										<NavLink to='/sign-up' className={navLinkClasses}>
											Sign up
										</NavLink>
									</li>
								</>
							)}
						</ul>
					</div>
				</Container>
			</nav>
		</header>
	)
}
