import React from 'react'
import { useGetTagCloudQuery } from '../../api/repository'
import { TagList } from '../tag-list/tag-list'

export const TagCloud: React.FC = () => {
	const { data, error, isLoading, isFetching } = useGetTagCloudQuery('')

	if (isLoading || isFetching) {
		return (
			<section className='font-josefin text-theme-blue mb-sectionBottom'>
				<h4 className='font-bold text-2xl mb-titleBottom flex items-center'>
					<span>Loading Tag Cloud...</span>
					<span className='h-0.5 min-w-[30px] ml-3.5 content-none bg-theme-green flex-auto'></span>
				</h4>
			</section>
		)
	}

	if (error) {
		return (
			<section className='font-josefin text-theme-blue mb-sectionBottom'>
				<h4 className='font-bold text-2xl mb-titleBottom flex items-center'>
					<span>Error while loading tags</span>
					<span className='h-0.5 min-w-[30px] ml-3.5 content-none bg-theme-green flex-auto'></span>
				</h4>
			</section>
		)
	}

	return (
		<section className='font-josefin text-theme-blue mb-sectionBottom'>
			<h4 className='font-bold text-2xl mb-titleBottom flex items-center'>
				<span>Tag Cloud</span>
				<span className='h-0.5 min-w-[30px] ml-3.5 content-none bg-theme-green flex-auto'></span>
			</h4>
			<TagList list={data!.tags} tagStyle='CLOUD' />
		</section>
	)
}
