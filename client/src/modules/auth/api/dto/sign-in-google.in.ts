export interface SignInGoogleInDTO {
	access_token: string
	refresh_token: string
	scope: string
	token_type: string
	id_token: string
	expiry_date: number
}

export interface UserGoogle {
	at_hash: string
	aud: string
	azp: string
	email: string
	email_verified: boolean
	exp: number
	family_name: string
	given_name: string
	iat: number
	iss: string
	locale: string
	name: string
	picture: string
	sub: string
}
