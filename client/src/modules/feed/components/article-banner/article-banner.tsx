import React from 'react'
import { DateTime } from 'luxon'
import { FavoriteButton } from '../favorite-button/favorite-button'
import { ReadingTime } from '../reading-time/reading-time'

interface ArticleBannerProps {
	title: string
	createdAt: string
	favoritesCount: number
	favorited: boolean
	slug: string
	body: string
}

export const ArticleBanner: React.FC<ArticleBannerProps> = ({
	title,
	createdAt,
	favoritesCount,
	favorited,
	slug,
	body,
}) => {
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
			</div>
		</div>
	)
}
