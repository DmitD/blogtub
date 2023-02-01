import React from 'react'
import { NavLink, useSearchParams } from 'react-router-dom'
import clsx from 'clsx'

interface FeedToggleProps {
	defaultText?: string
	defaultLink?: string
}

export const FeedToggle: React.FC<FeedToggleProps> = ({
	defaultText = 'Global Feed',
	defaultLink = '/',
}) => {
	const [searchParams] = useSearchParams()
	const tag = searchParams.get('tag')

	const liClasses = clsx(
		'inline-block bg-white leading-none border-theme-green shadow-tag py-2.5 px-4 ',
		{
			'text-theme-blue/30 hover:text-theme-blue/60': tag,
			'border-b-2 cursor-default': !tag,
		}
	)

	return (
		<div className='mb-8'>
			<ul className='text-15px text-theme-blue'>
				<NavLink to={defaultLink} className='align-middle'>
					<li className={liClasses}>{defaultText}</li>
				</NavLink>
				{tag && (
					<li className='inline-block bg-white shadow-tag leading-none border-b-2 border-theme-green py-2.5 px-4 ml-2'>
						#{tag}
					</li>
				)}
			</ul>
		</div>
	)
}
