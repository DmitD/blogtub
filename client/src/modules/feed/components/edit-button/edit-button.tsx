import React, { ComponentProps } from 'react'
import { IoCreateOutline } from 'react-icons/io5'

interface EditButtonProps {
	onClick?: ComponentProps<'button'>['onClick']
}

export const EditButton: React.FC<EditButtonProps> = ({ onClick }) => {
	return (
		<button
			onClick={onClick}
			className='mr-3 hover:text-theme-green active:text-theme-green/80'
		>
			<IoCreateOutline className='text-theme-green inline-block align-middle h-5 w-5 mb-1' />
			<span>Edit</span>
		</button>
	)
}
