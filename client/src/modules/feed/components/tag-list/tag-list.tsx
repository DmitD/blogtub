import React from 'react'
import clsx from 'clsx'
import { Link } from 'react-router-dom'

enum TagListStyle {
	LIST = 'LIST',
	CLOUD = 'CLOUD',
}

interface TagListProps {
	list: string[]
	tagStyle?: keyof typeof TagListStyle
}

export const TagList: React.FC<TagListProps> = ({
	list,
	tagStyle = TagListStyle.LIST,
}) => {
	const tagClasses = clsx(
		'inline-block text-sm font-medium text-theme-blue bg-white mr-2.5 px-2 pt-1.5 pb-1 shadow-tag hover:text-theme-green',
		{ 'mb-3': tagStyle === TagListStyle.CLOUD }
	)

	return (
		<ul>
			{list.map(tag => (
				<li key={tag} className={tagClasses}>
					<Link to={`/?tag=${tag}`}>#{tag}</Link>
				</li>
			))}
		</ul>
	)
}
