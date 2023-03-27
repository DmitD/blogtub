import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex'
import type {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
} from '@reduxjs/toolkit/query'
import { RootState } from '../../store/store'
import { setUser } from '../../modules/auth/service/auth.slice'
import { SignUpInDTO } from '../../modules/auth/api/dto/sign-up.in'

export const baseQueryWithToken = fetchBaseQuery({
	baseUrl: 'http://localhost:5000/api',
	credentials: 'include',
	prepareHeaders: (headers, { getState }) => {
		const token = (getState() as RootState).auth.token

		if (token) {
			headers.set('authorization', `Bearer ${token}`)
		}

		return headers
	},
})

// create a new mutex
const mutex = new Mutex()

const baseQuery = fetchBaseQuery({
	baseUrl: 'http://localhost:5000/api',
	credentials: 'include',
})

// export const baseQueryWithReauth: BaseQueryFn<
// 	string | FetchArgs,
// 	unknown,
// 	FetchBaseQueryError
// > = async (args, api, extraOptions) => {
// 	// wait until the mutex is available without locking it
// 	await mutex.waitForUnlock()

// 	let result = await baseQueryWithToken(args, api, extraOptions)

// 	if (result.error && result.error.status === 401) {
// 		// checking whether the mutex is locked
// 		if (!mutex.isLocked()) {
// 			const release = await mutex.acquire()

// 			try {
// 				const token = (api.getState() as RootState).auth.token

// 				if (token && token.length < 500) {
// 					// try to get a new token
// 					const refreshResult = await baseQuery(
// 						{
// 							url: 'token/refresh/',
// 							method: 'get',
// 						},
// 						api,
// 						extraOptions
// 					)
// 					if (refreshResult.data) {
// 						// store the new token
// 						api.dispatch(setUser(refreshResult.data as SignUpInDTO))
// 						// retry the initial query
// 						return (result = await baseQueryWithToken(args, api, extraOptions))
// 					}
// 				}
// 				if (token && token.length > 500) {
// 					// try to get a new token
// 					const refreshResult = await baseQuery(
// 						{
// 							url: '/user/refresh-google-token',
// 							method: 'get',
// 						},
// 						api,
// 						extraOptions
// 					)
// 					if (refreshResult.data) {
// 						// store the new token
// 						api.dispatch(setUser(refreshResult.data as SignUpInDTO))
// 						// retry the initial query
// 						return (result = await baseQueryWithToken(args, api, extraOptions))
// 					}
// 				} else {
// 					await baseQuery(
// 						{
// 							url: '/user/logout',
// 							method: 'post',
// 						},
// 						api,
// 						extraOptions
// 					)
// 					api.dispatch(setUser(null))
// 				}
// 			} finally {
// 				// release must be called once the mutex should be released again.
// 				release()
// 			}
// 		} else {
// 			// wait until the mutex is available without locking it
// 			await mutex.waitForUnlock()
// 			result = await baseQueryWithToken(args, api, extraOptions)
// 		}
// 	}
// 	return result
// }

export const baseQueryWithReauth: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {
	let result = await baseQueryWithToken(args, api, extraOptions)

	if (result.error && result.error.status === 401) {
		const token = (api.getState() as RootState).auth.token
		console.log('=== token base-query-with-reauth.ts [118] ===', token)

		if (token && token.length < 500) {
			// try to get a new token
			const refreshResult = await baseQuery(
				{
					url: 'token/refresh/',
					method: 'get',
				},
				api,
				extraOptions
			)
			if (refreshResult.data) {
				// store the new token
				api.dispatch(setUser(refreshResult.data as SignUpInDTO))
				// retry the initial query
				return (result = await baseQueryWithToken(args, api, extraOptions))
			}
		}
		if (token && token.length > 500) {
			// try to get a new token
			const refreshResult = await baseQuery(
				{
					url: '/user/refresh-google-token',
					method: 'get',
				},
				api,
				extraOptions
			)
			if (refreshResult.data) {
				// store the new token
				api.dispatch(setUser(refreshResult.data as SignUpInDTO))
				// retry the initial query
				return (result = await baseQueryWithToken(args, api, extraOptions))
			}
		} else {
			await baseQuery(
				{
					url: '/user/logout',
					method: 'post',
				},
				api,
				extraOptions
			)
			api.dispatch(setUser(null))
		}
	}
	return result
}
