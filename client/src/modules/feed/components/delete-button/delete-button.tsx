import React from 'react'
import { IoTrashOutline } from 'react-icons/io5'

interface DeleteButtonProps {}

export const DeleteButton: React.FC<DeleteButtonProps> = ({}) => {
	return (
		<button className=' hover:text-theme-green active:text-theme-green/80'>
			<IoTrashOutline className='text-theme-green inline-block align-middle h-5 w-5 mb-1' />
			<span>Delete</span>
		</button>
	)
}
