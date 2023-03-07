export interface SignUpInDTO {
	accessToken: string
	refreshToken: string
	user: User
}

interface User {
	name: string
	email: string
	id: string
	isActivated: boolean
	img?: string
	exp?: number
}
