import React from 'react'
import { FeedArticle } from '../../api/dto/global-feed.in'
import { Post } from '../post/post'

interface RecentPostsProps {
	posts: FeedArticle[]
}

export const RecentPosts: React.FC<RecentPostsProps> = ({ posts }) => {
	return (
		<section className='text-theme-blue mb-rightSectionBottom'>
			<h4 className='flex items-center font-bold text-2xl mb-rightTitleBottom'>
				<span>Recent posts</span>
				<span className='content-none bg-theme-green h-0.5 min-w-[30px] ml-3.5 flex-auto'></span>
			</h4>
			{posts.map(post => (
				<Post
					key={post.slug}
					title={post.title}
					createdAt={post.createdAt}
					author={post.author.username}
				/>
			))}
		</section>
	)
}
