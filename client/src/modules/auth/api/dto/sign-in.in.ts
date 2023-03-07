export interface SignInInDTO {
	accessToken: string
	refreshToken: string
	user: User
}

interface User {
	id: string
	name: string
	email: string
	isActivated: boolean
	img?: string
}
