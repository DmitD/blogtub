import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../../store/store'
import { SignUpInDTO } from '../api/dto/sign-up.in'

interface AuthState {
	user: SignUpInDTO['user'] | null
	token: SignUpInDTO['accessToken'] | null
}

const initialState: AuthState = {
	user: null,
	token: null,
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<SignUpInDTO | null>) {
			if (action.payload === null) {
				state.user = null
				state.token = null
				return
			}

			state.user = {
				...action.payload.user,
			}
			state.token = action.payload.accessToken
		},
	},
})

export const selectUser = (state: RootState) => state.auth.user
export const selectToken = (state: RootState) => state.auth.token

export const { setUser } = authSlice.actions
