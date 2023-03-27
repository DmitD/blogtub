import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import clsx from 'clsx'
import { IoCreateOutline, IoSettingsOutline } from 'react-icons/io5'
import { Container } from '../container/container'
import { useAuth } from '../../../modules/auth/hooks/use-auth'
import defaultAvatar from '../../../assets/img/user-avatar.svg'

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
			if (user!.exp && user!.exp < new Date().getTime()) {
				logout()
				return
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
								<NavLink to='/' className={navLinkClasses} end>
									Home
								</NavLink>
							</li>
							{isLoggedIn ? (
								<>
									<li className='ml-4'>
										<NavLink to='/editor' className={navLinkClasses}>
											<IoCreateOutline className='inline-block text-lg align-middle pb-1' />
											New article
										</NavLink>
									</li>
									<li className='ml-4'>
										<NavLink to='/settings' className={navLinkClasses}>
											<IoSettingsOutline className='inline-block text-lg align-middle pb-1' />
											Settings
										</NavLink>
									</li>
									<li className='ml-4'>
										<NavLink
											to={`/${user?.username}`}
											className={navLinkClasses}
										>
											<img
												src={user?.image || defaultAvatar}
												alt={`${user?.username} avatar`}
												className='w-6 h-6 mr-1 rounded-full inline-block'
												onError={(e: React.ChangeEvent<HTMLImageElement>) => {
													e.target.src = defaultAvatar
												}}
											/>
											{user?.username}
										</NavLink>
									</li>
									<li className='ml-4'>
										<NavLink
											to='/'
											className='py-headerNavItem text-theme-blue/30 hover:text-theme-blue/60'
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
