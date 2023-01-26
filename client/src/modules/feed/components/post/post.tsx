import React from 'react'
import { Link } from 'react-router-dom'
import { DateTime } from 'luxon'

interface PostProps {
	title: string
	createdAt: string
	author: string
}

export const Post: React.FC<PostProps> = ({ title, createdAt, author }) => {
	return (
		<div className=' text-theme-blue mb-5'>
			<div className='font-josefin text-post font-bold mb-2'>
				<Link
					to={`/@${author}`}
					className='align-middle hover:text-theme-green'
				>
					<img
						src='https://themes.estudiopatagon.com/wordpress/maktub/wp-content/uploads/2022/05/avatar-10.jpg'
						alt={`${author} avatar`}
						className='inline-block w-[20px] h-[20px] rounded-full shadow-author mr-2'
					/>
					<span>{author}</span>
				</Link>
			</div>
			<div className='font-josefin text-data font-bold  mb-2'>
				<Link
					to='/article'
					className='pt-1 hover:underline decoration-theme-green'
				>
					<h4 className='leading-6'>{title}</h4>
				</Link>
			</div>
			<div className='text-article-gray text-xs'>
				<span>
					{DateTime.fromISO(createdAt).toLocaleString(DateTime.DATE_FULL)}
				</span>
			</div>
		</div>
	)
}
