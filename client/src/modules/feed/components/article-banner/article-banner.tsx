import React from 'react'
import { DateTime } from 'luxon'
import { FavoriteButton } from '../favorite-button/favorite-button'
import { ReadingTime } from '../reading-time/reading-time'
import { useAuth } from '../../../auth/hooks/use-auth'
import { Profile } from '../../../profile/api/dto/profile.in'
import { EditButton } from '../edit-button/edit-button'
import { DeleteButton } from '../delete-button/delete-button'
import { useNavigate } from 'react-router-dom'

interface ArticleBannerProps {
	title: string
	createdAt: string
	favoritesCount: number
	favorited: boolean
	slug: string
	body: string
	author: Profile
}

export const ArticleBanner: React.FC<ArticleBannerProps> = ({
	title,
	createdAt,
	favoritesCount,
	favorited,
	slug,
	body,
	author,
}) => {
	const { user } = useAuth()

	const navigate = useNavigate()
	const navigateToEditArticle = () => {
		navigate(`/editor/${slug}`)
	}

	return (
		<div>
			<h2 className='text-3xl text-center font-bold pb-1 pt-1 mb-1.5'>
				{title}
			</h2>
			<div className='text-15px font-source text-center text-article-gray'>
				<span className='mr-3'>
					{DateTime.fromISO(createdAt).toLocaleString(DateTime.DATE_SHORT)}
				</span>
				<ReadingTime article={body} />
				<FavoriteButton
					count={favoritesCount}
					slug={slug}
					isFavorited={favorited}
				/>
				{user?.username === author.username && (
					<div className='inline-block absolute top-8 right-8'>
						<EditButton onClick={navigateToEditArticle} />
						<DeleteButton />
					</div>
				)}
			</div>
		</div>
	)
}
