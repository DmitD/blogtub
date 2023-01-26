import React from 'react'
import ReactPaginate from 'react-paginate'
import { Container } from '../../../../common/components/container/container'
import { useGetGlobalFeedQuery } from '../../api/repository'
import { ArticleList } from '../article-list/article-list'
import { FeedToggle } from '../feed-toggle/feed-toggle'
import { FEED_PAGE_SIZE } from '../../consts'
import { useSearchParams } from 'react-router-dom'
import { serializeSearchParams } from '../../../../utils/router'
import { TagCloud } from '../tag-cloud/tag-cloud'
import { Social } from '../social/social'
import { RecentPosts } from '../recent-posts/recent-posts'

export const Feed: React.FC = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	const [page, setPage] = React.useState(
		searchParams.get('page') ? Number(searchParams.get('page')) : 0
	)
	const handleChangePage = ({ selected }: { selected: number }) => {
		setPage(selected)
		setSearchParams(serializeSearchParams({ page: String(selected) }))
	}

	const { data, error, isLoading, isFetching } = useGetGlobalFeedQuery({
		page,
		tag: searchParams.get('tag'),
	})

	if (isLoading || isFetching) {
		return <Container>Feed Loading...</Container>
	}

	if (error) {
		return <Container>Error while loading feed</Container>
	}

	return (
		<Container>
			<FeedToggle />
			<div className='flex flex-row justify-between'>
				<div className='max-w-[728px] min-w-[728px]'>
					<ArticleList list={data?.articles || []} />
					<nav>
						<ReactPaginate
							pageCount={(data?.articlesCount || 0) / FEED_PAGE_SIZE}
							pageRangeDisplayed={3}
							previousLabel='<'
							nextLabel='>'
							containerClassName='flex justify-center text-theme-blue'
							pageClassName='inline-block px-3 py-2'
							pageLinkClassName='-ml-px text-theme-blue text-data'
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
