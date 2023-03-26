import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const blogtubBaseQuery = fetchBaseQuery({
	baseUrl: 'http://localhost:5000/api',
	credentials: 'include',
})
