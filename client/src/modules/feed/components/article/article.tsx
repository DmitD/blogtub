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
			<div className='p-12 bg-white mx-auto mt-0 mb-artBottom relative'>
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
							className='font-josefin text-article font-bold text-theme-blue pb-1 pt-1 mb-1.5 hover:underline decoration-theme-green'
						>
							<h2>{title}</h2>
						</Link>
						<div className='text-article-gray text-data'>
							<span className='mr-3'>
								{DateTime.fromISO(createdAt).toLocaleString(DateTime.DATE_FULL)}
							</span>
							<ReadingTime />
							<FavoriteButton count={favoritesCount} />
						</div>
					</div>
				</div>
				<div className='mt-8 mb-14 text-article-gray text-pg break-words align-baseline leading-pg'>
					<p>{description}…</p>
				</div>
				<div className='flex justify-between font-josefin text-theme-blue'>
					<TagList list={tagList} />
					<Link
						to={`/@${author.username}`}
						className='align-middle hover:text-theme-green'
					>
						<img
							src='https://themes.estudiopatagon.com/wordpress/maktub/wp-content/uploads/2022/05/avatar-10.jpg'
							alt={`${author.username} avatar`}
							className='inline-block w-9 h-9 rounded-full shadow-author mr-2'
						/>
						<span className='text-data'>{author.username}</span>
					</Link>
				</div>
				<div className='absolute -bottom-2 left-1/2 -translate-x-2/4 z-10'>
					<Link to='/article'>
						<span className='font-josefin text-data text-white bg-theme-blue hover:text-theme-green py-3 px-6'>
							Continue Reading
						</span>
					</Link>
				</div>
			</div>
		</article>
	)
}
