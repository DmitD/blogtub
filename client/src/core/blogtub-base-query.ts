import { axiosBaseQuery } from './axios-base-query'

export const blogtubBaseQuery = axiosBaseQuery({
	baseUrl: 'http://localhost:5000/api',
	//baseUrl: 'https://api.realworld.io/api',
})
