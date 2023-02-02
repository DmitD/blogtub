import React from 'react'
import { FollowButton } from '../follow-button/follow-button'

export const ProfileInfo: React.FC = () => {
	return (
		<div className='text-theme-blue mb-6'>
			<img
				src='https://themes.estudiopatagon.com/wordpress/maktub/wp-content/uploads/2022/05/avatar-10.jpg'
				alt={`avatar`}
				className='w-20 h-20 rounded-full shadow-author mr-6'
			/>
			<h4 className='text-2xl font-bold my-4'>Jonathan Doe</h4>
			<FollowButton />
		</div>
	)
}
