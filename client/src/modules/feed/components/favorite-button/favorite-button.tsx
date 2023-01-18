import React from 'react'
import { IoIosHeartEmpty } from 'react-icons/io'

interface FavoriteButtonProps {
	count: number
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({ count }) => {
	return (
		<button className='text-center select-none whitespace-nowrap hover:text-theme-green align-middle'>
			<IoIosHeartEmpty className='text-theme-green inline-block mb-0.5 h-5 w-5' />
			&nbsp;
			<span>{count}</span>
		</button>
	)
}
