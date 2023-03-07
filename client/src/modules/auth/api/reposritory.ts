import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { blogtubBaseQuery } from '../../../core/blogtub-base-query'
import { SignInGoogleInDTO } from './dto/sign-in-google.in'
import { SignInInDTO } from './dto/sign-in.in'
import { SignUpInDTO } from './dto/sign-up.in'

interface SignUpParams {
	firstName: string
	lastName: string
	email: string
	password: string
	confirmPassword: string
}

interface SignInParams {
	email: string
	password: string
}

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:5000/api',
		credentials: 'include',
	}),
	endpoints: builder => ({
		signUp: builder.query<SignUpInDTO, SignUpParams>({
			query: args => ({
				url: '/user/signup',
				method: 'post',
				body: args,
			}),
		}),
		signIn: builder.query<SignInInDTO, SignInParams>({
			query: args => ({
				url: '/user/login',
				method: 'post',
				body: args,
			}),
		}),
		checkAuth: builder.query<SignInInDTO, any>({
			query: () => ({
				url: '/user/refresh-token',
				method: 'get',
			}),
		}),
		signInGoogle: builder.query<SignInGoogleInDTO, string>({
			query: code => ({
				url: '/user/login-google',
				method: 'post',
				body: { code },
			}),
		}),
		checkAuthGoogle: builder.query<SignInGoogleInDTO, any>({
			query: () => ({
				url: '/user/refresh-google-token',
				method: 'get',
			}),
		}),
		logout: builder.query<any, any>({
			query: () => ({
				url: '/user/logout',
				method: 'post',
			}),
		}),
	}),
})

export const {
	useLazySignUpQuery,
	useLazySignInQuery,
	useLazyCheckAuthQuery,
	useLazySignInGoogleQuery,
	useLazyCheckAuthGoogleQuery,
	useLazyLogoutQuery,
} = authApi
