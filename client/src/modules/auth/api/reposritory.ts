import { createApi } from '@reduxjs/toolkit/query/react'
import { blogtubBaseQuery } from '../../../core/blogtub-base-query'
import { SignInInDTO } from './dto/sign-in.in'
import { SignUpInDTO } from './dto/sign-up.in'

interface SignUpParams {
	firstName: string
	lastName: string
	email: string
	password: string
	repeatPassword: string
}

interface SignInParams {
	email: string
	password: string
}

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: blogtubBaseQuery,
	endpoints: builder => ({
		signUp: builder.query<SignUpInDTO, SignUpParams>({
			query: args => ({
				url: '/users',
				method: 'post',
				data: { user: args },
			}),
		}),
		signIn: builder.query<SignInInDTO, SignInParams>({
			query: args => ({
				url: '/users/login',
				method: 'post',
				data: { user: args },
			}),
		}),
	}),
})

export const { useLazySignUpQuery, useLazySignInQuery } = authApi
