import React from 'react'

interface TagListProps {
	list: string[]
}

export const TagList: React.FC<TagListProps> = ({ list }) => {
	return (
		<ul>
			{list.map(tag => (
				<li
					key={tag}
					className='text-sm mr-2.5 px-2 pt-1.5 pb-1 shadow-tag inline-block'
				>
					#{tag}
				</li>
			))}
		</ul>
	)
}
