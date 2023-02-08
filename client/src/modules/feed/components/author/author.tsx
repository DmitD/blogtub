import React from 'react'
import clsx from 'clsx'

enum AuthorStyle {
	SMALL = 'SMALL',
	MEDIUM = 'MEDIUM',
}

interface AuthorProps {
	name: string
	authorStyle: keyof typeof AuthorStyle
}

export const Author: React.FC<AuthorProps> = ({
	name,
	authorStyle = AuthorStyle.MEDIUM,
}) => {
	const imgClasses = clsx(
		'inline-block w-9 h-9 rounded-full shadow-author mr-2',
		{ 'w-5 h-5': authorStyle === AuthorStyle.SMALL },
		{ 'w-9 h-9': authorStyle === AuthorStyle.MEDIUM }
	)
	const nameClasses = clsx(
		'font-medium',
		{ 'text-13px': authorStyle === AuthorStyle.SMALL },
		{ 'text-15px': authorStyle === AuthorStyle.MEDIUM }
	)

	return (
		<>
			<img
				src='https://themes.estudiopatagon.com/wordpress/maktub/wp-content/uploads/2022/05/avatar-10.jpg'
				alt={`${name} avatar`}
				className={imgClasses}
			/>
			<span className={nameClasses}>{name}</span>
		</>
	)
}
