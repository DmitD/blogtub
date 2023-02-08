import React from 'react'
import { FeedArticle } from '../../api/dto/global-feed.in'
import { Post } from '../post/post'
import { SectionTitle } from '../section-title/section-title'

interface RecentPostsProps {
	posts: FeedArticle[]
}

export const RecentPosts: React.FC<RecentPostsProps> = ({ posts }) => {
	return (
		<section className='text-theme-blue mb-rightSectionBottom'>
			<SectionTitle title='Recent posts' />
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
