import React from 'react'
import { Post } from '../post/post'
import { SectionTitle } from '../section-title/section-title'
import { useGetRecentPostsQuery } from '../../api/repository'

export const RecentPosts: React.FC = () => {
	const { data, error, isLoading, isFetching } = useGetRecentPostsQuery({
		limit: 4,
	})

	if (isLoading || isFetching) {
		return (
			<section className='mb-rightSectionBottom'>
				<SectionTitle title='Loading Recent Posts...' />
			</section>
		)
	}

	if (error) {
		return (
			<section className='mb-rightSectionBottom'>
				<SectionTitle title='Error while loading tags' />
			</section>
		)
	}

	return (
		<section className='mb-rightSectionBottom'>
			<SectionTitle title='Recent posts' />
			{data?.articles.map(post => (
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
