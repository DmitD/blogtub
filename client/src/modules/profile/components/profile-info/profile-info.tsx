import React from 'react'
import { FollowButton } from '../follow-button/follow-button'
import { Profile } from '../../api/dto/profile.in'

interface ProfileInfoProps {
	profile: Profile
}

export const ProfileInfo: React.FC<ProfileInfoProps> = ({ profile }) => {
	return (
		<div className='text-theme-blue mb-6'>
			<img
				src='https://themes.estudiopatagon.com/wordpress/maktub/wp-content/uploads/2022/05/avatar-10.jpg'
				alt={`${profile.username}`}
				className='w-20 h-20 rounded-full shadow-author mr-6'
			/>
			<h4 className='text-2xl font-bold my-4'>{profile.username}</h4>
			<FollowButton />
		</div>
	)
}
