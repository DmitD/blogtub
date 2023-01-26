import React from 'react'
import { NavLink, useSearchParams } from 'react-router-dom'
import clsx from 'clsx'

export const FeedToggle: React.FC = () => {
	const [searchParams] = useSearchParams()
	const tag = searchParams.get('tag')

	const liClasses = clsx(
		'bg-white shadow-tag inline-block py-2.5 px-4 leading-none border-theme-green',
		{
			'text-theme-blue/30 hover:text-theme-blue/60': tag,
			'border-b-2 cursor-default': !tag,
		}
	)

	return (
		<div className='mb-8'>
			<ul className='font-josefin text-data text-theme-blue'>
				<NavLink to='/' className='align-middle'>
					<li className={liClasses}>Global Feed</li>
				</NavLink>
				{tag && (
					<li className='bg-white shadow-tag inline-block py-2.5 px-4 ml-2 leading-none border-b-2 border-theme-green'>
						#{tag}
					</li>
				)}
			</ul>
		</div>
	)
}
