export default class UserDto {
	id
	username
	email
	isActivated
	following

	constructor(model, userId) {
		this.id = model._id
		this.username = model.username
		this.email = model.email
		this.isActivated = model.isActivated
		this.following = model.followedBy.includes(userId)
	}
}
