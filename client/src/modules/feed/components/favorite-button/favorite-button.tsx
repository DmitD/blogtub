import React from 'react'
import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import { toast } from 'react-toastify'
import { routes } from '../../../../core/routes'
import { useAuth } from '../../../auth/hooks/use-auth'
import {
	useFavoriteArticleMutation,
	useUnfavoriteArticleMutation,
} from '../../api/repository'

interface FavoriteButtonProps {
	count: number
	slug: string
	isFavorited: boolean
	disabled?: React.ComponentProps<'button'>['disabled']
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
	count,
	slug,
	isFavorited = false,
}) => {
	const { isLoggedIn } = useAuth()
	const navigate = useNavigate()
	const [triggerFavoriteMutation] = useFavoriteArticleMutation()
	const [triggerUnfavoriteMutation] = useUnfavoriteArticleMutation()

	const handleFavoriteClick = async () => {
		// if (!isLoggedIn) {
		// 	navigate(routes.signIn.path)
		// 	return
		// }

		try {
			if (isFavorited) {
				await triggerUnfavoriteMutation({ slug }).unwrap()
			} else {
				await triggerFavoriteMutation({ slug }).unwrap()
			}
		} catch (e) {
			toast.error("Something wen't wrong. Please, try again later")
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
				&nbsp;{count}
			</>
		)
	}

	return (
		<button
			onClick={handleFavoriteClick}
			className={clsx(
				'text-center select-none whitespace-nowrap align-middle mr-4',
				{ 'hover:text-theme-green active:text-theme-green/80': isLoggedIn }
			)}
			disabled={!isLoggedIn}
		>
			<Likes />
		</button>
	)
}
