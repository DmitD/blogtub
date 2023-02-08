import React from 'react'
import { Link } from 'react-router-dom'
import { DateTime } from 'luxon'
import { Author } from '../author/author'

interface PostProps {
	title: string
	createdAt: string
	author: string
}

export const Post: React.FC<PostProps> = ({ title, createdAt, author }) => {
	return (
		<div className=' text-theme-blue mb-5'>
			<div className='mb-2'>
				<Link
					to={`/@${author}`}
					className='align-middle hover:text-theme-green'
				>
					<Author name={author} authorStyle='SMALL' />
				</Link>
			</div>
			<div className='text-15px font-bold mb-2'>
				<Link
					to='/article'
					className='pt-1 hover:underline decoration-theme-green'
				>
					<h4 className='leading-6'>{title}</h4>
				</Link>
			</div>
			<div className='text-xs text-article-gray'>
				<span>
					{DateTime.fromISO(createdAt).toLocaleString(DateTime.DATE_SHORT)}
				</span>
			</div>
		</div>
	)
}
