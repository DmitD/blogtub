import React from 'react'
import { FeedArticle } from '../../api/dto/global-feed.in'
import { Post } from '../post/post'

interface RecentPostsProps {
	posts: FeedArticle[]
}

export const RecentPosts: React.FC<RecentPostsProps> = ({ posts }) => {
	return (
		<section className='font-josefin text-theme-blue mb-sectionBottom'>
			<h4 className='font-bold text-2xl mb-titleBottom flex items-center'>
				<span>Recent posts</span>
				<span className='h-0.5 min-w-[30px] ml-3.5 content-none bg-theme-green flex-auto'></span>
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
