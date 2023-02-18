import React from 'react'
import ReactPaginate from 'react-paginate'
import { FeedData } from '../../api/repository'
import { ArticleList } from '../article-list/article-list'
import { FEED_PAGE_SIZE } from '../../consts'
import { usePageParam } from '../../hooks/use-page-param'

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
	const { page, setPage } = usePageParam()

	const handleChangePage = ({ selected }: { selected: number }) => {
		setPage(selected)
	}

	if (isLoading || isFetching) {
		return <p className='text-center'>Feed Loading...</p>
	}

	if (error) {
		return <p className='text-center'>Error while loading feed</p>
	}

	if (data?.articlesCount === 0) {
		return <p className='text-center'>No articles are here... yet.</p>
	}

	return (
		<>
			<ArticleList list={data?.articles || []} />
			<nav>
				<ReactPaginate
					pageCount={Math.ceil((data?.articlesCount || 0) / FEED_PAGE_SIZE)}
					pageRangeDisplayed={3}
					previousLabel='<'
					nextLabel='>'
					containerClassName='flex justify-center font-source'
					pageClassName='inline-block px-3 py-2'
					pageLinkClassName='-ml-px text-15px'
					activeLinkClassName='opacity-50'
					previousClassName='inline-block px-3 py-2'
					nextClassName='inline-block px-3 py-2'
					breakClassName='inline-block px-3 py-2'
					onPageChange={handleChangePage}
					forcePage={page}
				/>
			</nav>
		</>
	)
}
