import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useGetArticleCommentsQuery } from '../../api/repository'
import { CommentItem } from '../comment-item/comment-item'
import { SectionTitle } from '../section-title/section-title'

interface CommentsListProps {}

export const CommentsList: React.FC<CommentsListProps> = () => {
	const { slug } = useParams()

	const { data, isLoading } = useGetArticleCommentsQuery({ slug: slug! })

	if (isLoading) {
		return <p className='text-theme-blue'>Loading comments...</p>
	}

	if (!data) {
		return (
			<div className='bg-white shadow-articlePage p-12'>
				<p className='text-theme-blue mb-8'>
					<Link
						to='/sign-in'
						className='text-theme-green hover:text-theme-darkGreen'
					>
						Sign in
					</Link>{' '}
					or{' '}
					<Link
						to='/sign-up'
						className='text-theme-green hover:text-theme-darkGreen'
					>
						sign up
					</Link>{' '}
					to add comments on this article.
				</p>
				<p className='text-theme-blue'>No comments found</p>
			</div>
		)
	}

	return (
		<div className='bg-white shadow-articlePage p-12'>
			<SectionTitle title='Comments' />
			<div className='flex flex-col gap-8'>
				<p className='text-theme-blue'>
					<Link
						to='/sign-in'
						className='text-theme-green hover:text-theme-darkGreen'
					>
						Sign in
					</Link>{' '}
					or{' '}
					<Link
						to='/sign-up'
						className='text-theme-green hover:text-theme-darkGreen'
					>
						sign up
					</Link>{' '}
					to add comments on this article.
				</p>
				{data.comments.map(comment => (
					<CommentItem
						key={comment.id}
						author={comment.author}
						createdAt={comment.createdAt}
						comment={comment.body}
					/>
				))}
			</div>
		</div>
	)
}
