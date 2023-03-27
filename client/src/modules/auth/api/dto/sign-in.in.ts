export interface SignInInDTO {
	accessToken: string
	refreshToken: string
	user: User
}

interface User {
	id: string
	username: string
	email: string
	image?: string
	isActivated: boolean
	following?: boolean
	exp?: number
}
