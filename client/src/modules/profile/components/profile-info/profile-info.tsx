import React from 'react'
import { Profile } from '../../api/dto/profile.in'
import { Button } from '../../../../common/components/button/button'
import { useAuth } from '../../../auth/hooks/use-auth'
import {
	useFollowUserMutation,
	useUnfollowUserMutation,
} from '../../api/repository'

interface ProfileInfoProps {
	profile: Profile
}

export const ProfileInfo: React.FC<ProfileInfoProps> = ({ profile }) => {
	const { username, following } = profile
	const { user } = useAuth()

	const [triggerFollow] = useFollowUserMutation()
	const [triggerUnfollow] = useUnfollowUserMutation()

	const toggleFollow = () => {
		if (!following) {
			triggerFollow({ username })
		} else {
			triggerUnfollow({ username })
		}
	}

	return (
		<div className='mb-6'>
			<img
				src='https://themes.estudiopatagon.com/wordpress/maktub/wp-content/uploads/2022/05/avatar-10.jpg'
				alt={`${profile.username}`}
				className='w-20 h-20 rounded-full shadow-author mr-6'
			/>
			<h4 className='text-2xl font-bold my-4'>{profile.username}</h4>
			{user?.username !== profile.username ? (
				<Button onClick={toggleFollow}>
					{following ? 'Following' : 'Follow'}
				</Button>
			) : (
				<Button>Edit settings</Button>
			)}
		</div>
	)
}
