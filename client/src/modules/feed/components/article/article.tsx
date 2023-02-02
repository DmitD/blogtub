import React from 'react'
import { DateTime } from 'luxon'
import { Link } from 'react-router-dom'
import { FeedArticle } from '../../api/dto/global-feed.in'
import { FavoriteButton } from '../favorite-button/favorite-button'
import { ReadingTime } from '../reading-time/reading-time'
import { TagList } from '../tag-list/tag-list'

interface ArticleProps extends FeedArticle {}

export const Article: React.FC<ArticleProps> = ({
	author,
	createdAt,
	title,
	description,
	favoritesCount,
	tagList,
}) => {
	return (
		<article>
			<div className='bg-white p-12 mx-auto mt-0 mb-articleBottom relative'>
				<div className='flex items-center'>
					<Link to='/article'>
						<img
							src='https://themes.estudiopatagon.com/wordpress/maktub/wp-content/uploads/2019/07/mixkit-man-holding-the-brim-of-a-yellow-fedora-that-covers-93-desktop-wallpaper-150x150.jpg'
							alt='article'
							className='inline-block min-h-[120px] min-w-[120px] drop-shadow-article border border-solid border-white'
						/>
					</Link>
					<div className='inline-flex flex-col ml-7'>
						<Link
							to='/article'
							className='text-38px font-bold text-theme-blue pb-1 pt-1 mb-1.5 hover:underline decoration-theme-green'
						>
							<h2>{title}</h2>
						</Link>
						<div className='text-15px font-source text-article-gray'>
							<span className='mr-3'>
								{DateTime.fromISO(createdAt).toLocaleString(DateTime.DATE_FULL)}
							</span>
							<ReadingTime />
							<FavoriteButton count={favoritesCount} />
						</div>
					</div>
				</div>
				<div className='text-17px font-source text-article-gray break-words align-baseline leading-pg mt-8 mb-14'>
					<p>{description}…</p>
				</div>
				<div className='flex justify-between text-theme-blue'>
					<TagList list={tagList} />
					<Link
						to={`/${encodeURIComponent(author.username)}`}
						className='align-middle hover:text-theme-green'
					>
						<img
							src='https://themes.estudiopatagon.com/wordpress/maktub/wp-content/uploads/2022/05/avatar-10.jpg'
							alt={`${author.username} avatar`}
							className='inline-block w-9 h-9 rounded-full shadow-author mr-2'
						/>
						<span className='text-15px'>{author.username}</span>
					</Link>
				</div>
				<div className='text-15px text-white absolute -bottom-2 left-1/2 -translate-x-2/4 z-10'>
					<Link to='/article'>
						<span className='bg-theme-blue hover:text-theme-green py-3 px-6'>
							Continue Reading
						</span>
					</Link>
				</div>
			</div>
		</article>
	)
}
