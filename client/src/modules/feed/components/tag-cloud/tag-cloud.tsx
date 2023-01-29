import React from 'react'
import { useGetTagCloudQuery } from '../../api/repository'
import { TagList } from '../tag-list/tag-list'

export const TagCloud: React.FC = () => {
	const { data, error, isLoading, isFetching } = useGetTagCloudQuery('')

	if (isLoading || isFetching) {
		return (
			<section className='text-theme-blue mb-rightSectionBottom'>
				<h4 className='flex items-center font-bold text-2xl mb-rightTitleBottom'>
					<span>Loading Tag Cloud...</span>
					<span className='content-none bg-theme-green h-0.5 min-w-[30px] ml-3.5 flex-auto'></span>
				</h4>
			</section>
		)
	}

	if (error) {
		return (
			<section className='text-theme-blue mb-rightSectionBottom'>
				<h4 className='flex items-center font-bold text-2xl mb-rightTitleBottom'>
					<span>Error while loading tags</span>
					<span className='content-none bg-theme-green h-0.5 min-w-[30px] ml-3.5 flex-auto'></span>
				</h4>
			</section>
		)
	}

	return (
		<section className='text-theme-blue mb-rightSectionBottom'>
			<h4 className='flex items-center font-bold text-2xl mb-rightTitleBottom'>
				<span>Tag Cloud</span>
				<span className='content-none bg-theme-green h-0.5 min-w-[30px] ml-3.5 flex-auto'></span>
			</h4>
			<TagList list={data!.tags} tagStyle='CLOUD' />
		</section>
	)
}
