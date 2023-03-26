import React from 'react'
import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import { routes } from '../../../../core/routes'
import { useAuth } from '../../../auth/hooks/use-auth'
import { useFavoriteArticleMutation } from '../../api/repository'

interface FavoriteButtonProps {
	count: number
	slug: string
	isFavorited: boolean
	disabled?: React.ComponentProps<'button'>['disabled']
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
	count,
	slug,
	isFavorited,
}) => {
	const { isLoggedIn } = useAuth()
	const navigate = useNavigate()
	const [triggerFavoroiteMutation] = useFavoriteArticleMutation()

	const handleFavoriteClick = () => {
		if (!isLoggedIn) {
			navigate(routes.signIn.path)
			return
		}
	}

	const Likes = () => {
		if (count > 0) {
			return isFavorited ? (
				<>
					<IoIosHeart className='text-theme-green inline-block mb-0.5 h-5 w-5' />
					&nbsp;
					{count > 2
						? `You and ${count - 1} others`
						: `${count} like${count > 1 ? 's' : ''}`}
				</>
			) : (
				<>
					<IoIosHeartEmpty className='text-theme-green inline-block mb-0.5 h-5 w-5' />
					&nbsp;{count}
				</>
			)
		}

		return (
			<>
				<IoIosHeartEmpty className='text-theme-green inline-block mb-0.5 h-5 w-5' />
			</>
		)
	}

	return (
		<button
			className={clsx(
				'text-center select-none whitespace-nowrap align-middle',
				{ 'hover:text-theme-green active:text-theme-green/80': isLoggedIn }
			)}
			disabled={!isLoggedIn}
		>
			<Likes />
		</button>
	)
}
