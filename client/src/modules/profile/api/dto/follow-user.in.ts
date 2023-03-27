export interface FollowUserInDTO {
	profile: Profile
}

export interface Profile {
	id: string
	username: string
	email: string
	image?: string
	isActivated: boolean
	following?: boolean
}
