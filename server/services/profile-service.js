import User from '../models/user-model.js'
import ApiError from '../exceptions/api-error.js'
import UserDto from '../dtos/user-dto.js'

class ProfileService {
	async getProfile(username, userId) {
		const existingProfile = await User.findOne({ username })

		if (!existingProfile) {
			throw ApiError.NotFound()
		}

		const userDto = new UserDto(existingProfile, userId)

		return { ...userDto }
	}

	async followUser(username, userId) {
		const existingProfile = await User.findOne({ username })

		if (!existingProfile) {
			throw ApiError.NotFound()
		}

		await User.findByIdAndUpdate(
			existingProfile._id,
			{ $push: { followedBy: userId } },
			{ new: true, useFindAndModify: false }
		)

		await User.findByIdAndUpdate(
			userId,
			{ $push: { following: existingProfile._id } },
			{ new: true, useFindAndModify: false }
		)

		const userDto = new UserDto(existingProfile, userId)

		return { ...userDto }
	}

	async unfollowUser(username, userId) {
		const existingProfile = await User.findOne({ username })

		if (!existingProfile) {
			throw ApiError.NotFound()
		}

		await User.findByIdAndUpdate(
			existingProfile._id,
			{ $pull: { followedBy: userId } },
			{ new: true, useFindAndModify: false }
		)

		await User.findByIdAndUpdate(
			userId,
			{ $pull: { following: existingProfile._id } },
			{ new: true, useFindAndModify: false }
		)

		const userDto = new UserDto(existingProfile, userId)

		return { ...userDto }
	}
}

export default new ProfileService()
