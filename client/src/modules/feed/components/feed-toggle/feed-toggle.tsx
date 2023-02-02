import React from 'react'
import { NavLink, useSearchParams } from 'react-router-dom'
import clsx from 'clsx'

interface FeedToggleItem {
	text: string
	link: string
}

interface FeedToggleProps {
	defaultText?: string
	defaultLink?: string
	items?: FeedToggleItem[]
}

export const FeedToggle: React.FC<FeedToggleProps> = ({
	defaultText = 'Global Feed',
	defaultLink = '/',
	items = [],
}) => {
	const [searchParams] = useSearchParams()
	const tag = searchParams.get('tag')

	const liClasses = ({ isActive }: { isActive: boolean }) => {
		return clsx(
			'inline-block align-middle bg-white leading-none border-theme-green shadow-tag py-2.5 px-4 mr-2',
			{
				'text-theme-blue/30 hover:text-theme-blue/60': tag || !isActive,
				'border-b-2 cursor-default': !tag && isActive,
			}
		)
	}

	return (
		<div className='mb-8'>
			<ul className='text-15px text-theme-blue'>
				<NavLink to={defaultLink} className={liClasses} end>
					<li>{defaultText}</li>
				</NavLink>
				{items.map(item => (
					<NavLink to={item.link} key={item.link} className={liClasses}>
						<li>{item.text}</li>
					</NavLink>
				))}
				{tag && (
					<li className='inline-block bg-white shadow-tag leading-none border-b-2 border-theme-green py-2.5 px-4'>
						#{tag}
					</li>
				)}
			</ul>
		</div>
	)
}
