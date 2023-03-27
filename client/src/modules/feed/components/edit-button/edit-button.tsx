import React from 'react'
import { IoCreateOutline } from 'react-icons/io5'

interface EditButtonProps {}

export const EditButton: React.FC<EditButtonProps> = ({}) => {
	return (
		<button className='mr-3 hover:text-theme-green active:text-theme-green/80'>
			<IoCreateOutline className='text-theme-green inline-block align-middle h-5 w-5 mb-1' />
			<span>Edit</span>
		</button>
	)
}
