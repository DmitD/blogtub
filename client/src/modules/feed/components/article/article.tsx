import React from 'react'
import { Link } from 'react-router-dom'
import { FavoriteButton } from '../favorite-button/favorite-button'
import { ReadingTime } from '../reading-time/reading-time'
import { TagList } from '../tag-list/tag-list'

export const Article: React.FC = () => {
	return (
		<article>
			<div className='p-14 bg-white mx-auto mt-0 mb-artBottom relative'>
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
							className='font-josefin text-article font-bold text-theme-blue pb-1 pt-1 mb-1.5 hover:underline'
						>
							Far far away, behind the word mountains
						</Link>
						<div className='text-article-gray text-data'>
							<span className='mr-3'>August 15, 2019</span>
							<ReadingTime />
							<FavoriteButton />
						</div>
					</div>
				</div>
				<div className='mt-8 mb-14 text-article-gray text-pg break-words align-baseline leading-pg'>
					<p>
						Far far away, behind the word mountains, far from the countries
						Vokalia and Consonantia, there live the blind texts. Separated they
						live in Bookmarksgrove right at the coast of the Semantics, a large
						language ocean. A small river named Duden…
					</p>
				</div>
				<div className='flex justify-between font-josefin font-bold text-theme-blue'>
					<TagList />
					<Link to='/author' className='align-middle hover:text-theme-green'>
						<img
							src='https://themes.estudiopatagon.com/wordpress/maktub/wp-content/uploads/2022/05/avatar-10.jpg'
							alt='author'
							className='inline-block w-9 h-9 rounded-full shadow-author mr-2'
						/>
						<span className='text-data'>Jonathan Doe</span>
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
