import React from 'react'
import { NavLink } from 'react-router-dom'

export const FeedToggle: React.FC = () => {
	return (
		<div className='mb-8'>
			<ul className='font-josefin text-data text-theme-blue'>
				<li className='bg-white shadow-tag inline-block py-2.5 px-4 leading-none'>
					<NavLink to='/' className='align-middle'>
						Global Feed
					</NavLink>
				</li>
			</ul>
		</div>
	)
}
