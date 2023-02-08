import React from 'react'
import { DateTime } from 'luxon'
import { Author } from '../../api/dto/article-comment.in'

interface CommentItemProps {
	author: Author
	createdAt: string
	comment: string
}

export const CommentItem: React.FC<CommentItemProps> = ({
	author,
	createdAt,
	comment,
}) => {
	return (
		<div className='inline-flex'>
			<div className='shrink-0'>
				<img
					src='https://themes.estudiopatagon.com/wordpress/maktub/wp-content/uploads/2022/05/avatar-10.jpg'
					alt={`${author.username} avatar`}
					className='w-11 h-11 rounded-full shadow-author'
				/>
			</div>
			<div className='ml-5'>
				<p className='text-15px mb-2.5'>
					<span className='font-bold text-theme-blue mr-2.5'>
						{author.username}
					</span>
					<span className='font-source text-article-gray'>
						{DateTime.fromISO(createdAt).toLocaleString(DateTime.DATE_SHORT)}
					</span>
				</p>
				<p className='font-source text-15px text-article-gray leading-6'>
					{comment}
				</p>
			</div>
		</div>
	)
}
