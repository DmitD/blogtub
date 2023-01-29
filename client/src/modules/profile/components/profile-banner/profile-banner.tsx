import React from 'react'
import { Container } from '../../../../common/components/container/container'
import { FollowButton } from '../follow-button/follow-button'

export const ProfileBanner: React.FC = () => {
	return (
		<Container>
			<div className='bg-white text-theme-blue py-12 px-5 my-12 shadow-profileBanner'>
				<div className='text-center mb-6'>
					<img
						src='https://themes.estudiopatagon.com/wordpress/maktub/wp-content/uploads/2022/05/avatar-10.jpg'
						alt={`avatar`}
						className='inline-block w-20 h-20 rounded-full shadow-author mr-6'
					/>
					<h4 className='inline-block text-3xl font-bold'>Jonathan Doe</h4>
				</div>
				<div className='flex justify-center'>
					<FollowButton />
				</div>
			</div>
		</Container>
	)
}
