import jwt_decode from 'jwt-decode'
import { useAppDispatch, useAppSelector } from '../../../store/store'
import {
	useLazySignInQuery,
	useLazySignUpQuery,
	useLazyCheckAuthQuery,
	useLazySignInGoogleQuery,
	useLazyLogoutQuery,
	useLazyCheckAuthGoogleQuery,
} from '../api/reposritory'
import { SignInOutDTO } from '../api/dto/sign-in.out'
import { SignUpOutDTO } from '../api/dto/sign-up.out'
import { selectToken, selectUser, setUser } from '../service/auth.slice'
import { SignInGoogleInDTO, UserGoogle } from '../api/dto/sign-in-google.in'

export const useAuth = () => {
	const dispatch = useAppDispatch()
	const user = useAppSelector(selectUser)
	const accessToken = useAppSelector(selectToken)
	const isLoggedIn = Boolean(user)

	const dataGoogle = (data: SignInGoogleInDTO) => {
		const user = jwt_decode<UserGoogle>(data.id_token)
		const authUser = {
			accessToken: data.id_token,
			refreshToken: data.refresh_token,
			user: {
				name: user.name,
				email: user.email,
				id: user.sub,
				isActivated: user.email_verified,
				img: user.picture,
				exp: user.exp,
			},
		}
		return authUser
	}

	// SIGN UP

	const [triggerSignUpQuery] = useLazySignUpQuery()

	const signUp = async (values: SignUpOutDTO['user']) => {
		const { data } = await triggerSignUpQuery(values, false)

		if (!data) {
			throw new Error('No data in query')
		}

		dispatch(setUser(data))
	}

	// SIGN IN

	const [triggerSignInQuery] = useLazySignInQuery()

	const signIn = async (values: SignInOutDTO['user']) => {
		const { data } = await triggerSignInQuery(values, false)

		if (!data) {
			throw new Error('No data in query')
		}

		dispatch(setUser(data))
	}

	// CHECK AUTH

	const [triggerCheckAuthQuery] = useLazyCheckAuthQuery()

	const checkAuth = async () => {
		const { data } = await triggerCheckAuthQuery('')

		if (!data) {
			throw new Error('No data in query')
		}

		dispatch(setUser(data))
	}

	// SIGN IN WITH GOOGLE

	const [triggerSignInGoogleQuery] = useLazySignInGoogleQuery()

	const signInGoogle = async (value: string) => {
		const { data } = await triggerSignInGoogleQuery(value, false)

		if (!data) {
			throw new Error('No data in query')
		}

		dispatch(setUser(dataGoogle(data)))
	}

	// CHECK AUTH GOOGLE

	const [triggerCheckAuthGoogleQuery] = useLazyCheckAuthGoogleQuery()

	const checkAuthGoogle = async () => {
		const { data } = await triggerCheckAuthGoogleQuery('')

		if (!data) {
			throw new Error('No data in query')
		}

		dispatch(setUser(dataGoogle(data)))
	}

	// LOGOUT

	const [triggerLogoutQuery] = useLazyLogoutQuery()

	const logout = async () => {
		try {
			await triggerLogoutQuery('')
			dispatch(setUser(null))
		} catch (e: any) {
			throw new Error(e)
		}
	}

	return {
		signIn,
		signUp,
		signInGoogle,
		checkAuth,
		checkAuthGoogle,
		logout,
		isLoggedIn,
		user,
		accessToken,
	}
}
