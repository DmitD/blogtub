import React from 'react'
import ReactPaginate from 'react-paginate'
import { Container } from '../../../../common/components/container/container'
import { FeedData } from '../../api/repository'
import { ArticleList } from '../article-list/article-list'
import { FeedToggle } from '../feed-toggle/feed-toggle'
import { FEED_PAGE_SIZE } from '../../consts'
import { useSearchParams } from 'react-router-dom'
import { serializeSearchParams } from '../../../../utils/router'
import { TagCloud } from '../tag-cloud/tag-cloud'
import { Social } from '../social/social'
import { RecentPosts } from '../recent-posts/recent-posts'

interface FeedProps {
	data?: FeedData
	error: any
	isLoading: boolean
	isFetching: boolean
}

export const Feed: React.FC<FeedProps> = ({
	data,
	error,
	isLoading,
	isFetching,
}) => {
	const [searchParams, setSearchParams] = useSearchParams()
	const page = searchParams.get('page') ? Number(searchParams.get('page')) : 0

	const handleChangePage = ({ selected }: { selected: number }) => {
		setSearchParams(serializeSearchParams({ page: String(selected) }))
	}

	if (isLoading || isFetching) {
		return <Container>Feed Loading...</Container>
	}

	if (error) {
		return <Container>Error while loading feed</Container>
	}

	return (
		<Container>
			<div className='flex flex-row justify-between'>
				<div className='max-w-[728px] min-w-[728px]'>
					<FeedToggle />
					<ArticleList list={data?.articles || []} />
					<nav>
						<ReactPaginate
							pageCount={(data?.articlesCount || 0) / FEED_PAGE_SIZE}
							pageRangeDisplayed={3}
							previousLabel='<'
							nextLabel='>'
							containerClassName='flex justify-center font-source text-theme-blue'
							pageClassName='inline-block px-3 py-2'
							pageLinkClassName='-ml-px text-theme-blue text-15px'
							activeLinkClassName='opacity-50'
							previousClassName='inline-block px-3 py-2'
							nextClassName='inline-block px-3 py-2'
							breakClassName='inline-block px-3 py-2'
							onPageChange={handleChangePage}
							forcePage={page}
						/>
					</nav>
				</div>
				<div className='max-w-[368px] min-w-[368px]'>
					<RecentPosts posts={data?.articles.slice(0, 4) || []} />
					<TagCloud />
					<Social />
				</div>
			</div>
		</Container>
	)
}
