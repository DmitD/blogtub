export interface SignUpOutDTO {
	user: User
}

interface User {
	firstName: string
	lastName: string
	email: string
	password: string
	confirmPassword: string
}
