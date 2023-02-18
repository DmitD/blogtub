import React from 'react'
import { useParams } from 'react-router-dom'
import { Container } from '../../../common/components/container/container'
import { ProfileInfo } from '../../profile/components/profile-info/profile-info'
import { useGetArticleQuery } from '../api/repository'
import { ArticleBanner } from '../components/article-banner/article-banner'
import { CommentsList } from '../components/comments-list/comments-list'
import { TagList } from '../components/tag-list/tag-list'

export const ArticlePage: React.FC = () => {
	const { slug } = useParams()

	const { data, isLoading } = useGetArticleQuery({ slug: slug! })

	const convertNewLines = (body: string) => {
		return body.split('\\n').join('<br />')
	}

	if (isLoading) {
		return null
	}

	if (!data) {
		return (
			<Container>
				<p className='mt-12'>Article not found</p>
			</Container>
		)
	}

	return (
		<Container>
			<div className='flex flex-row justify-between mt-8'>
				<div className='max-w-[728px] min-w-[728px]'>
					<div className='bg-white shadow-articlePage p-12 mx-auto mt-0 mb-articleBottom'>
						<ArticleBanner
							title={data.article.title}
							createdAt={data.article.createdAt}
							favoritesCount={data.article.favoritesCount}
							body={data.article.body}
						/>
						<p
							className='text-17px font-source text-article-gray align-baseline leading-pg mt-8 mb-14'
							dangerouslySetInnerHTML={{
								__html: convertNewLines(data.article.body),
							}}
						></p>
						<TagList list={data.article.tagList} />
					</div>
					<CommentsList />
				</div>
				<div className='max-w-[368px] min-w-[368px]'>
					<ProfileInfo profile={data.article.author} />
				</div>
			</div>
		</Container>
	)
}
