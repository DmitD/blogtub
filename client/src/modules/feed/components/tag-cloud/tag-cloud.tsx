import React from 'react'
import { useGetTagCloudQuery } from '../../api/repository'
import { SectionTitle } from '../section-title/section-title'
import { TagList } from '../tag-list/tag-list'

export const TagCloud: React.FC = () => {
	const { data, error, isLoading, isFetching } = useGetTagCloudQuery('')

	if (isLoading || isFetching) {
		return (
			<section className='mb-rightSectionBottom'>
				<SectionTitle title='Loading Tag Cloud...' />
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
			<SectionTitle title='Tag Cloud' />
			<TagList list={data!.tags} tagStyle='CLOUD' />
		</section>
	)
}
