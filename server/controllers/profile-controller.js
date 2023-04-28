import ProfileService from '../services/profile-service.js'

export const getProfile = async (req, res, next) => {
	try {
		const { username } = req.params
		const profile = await ProfileService.getProfile(username, req.userId)
		res.json({ profile })
	} catch (error) {
		res.status(409).json({ message: error.message }) // переделать
	}
}

export const followUser = async (req, res, next) => {
	try {
		const { username } = req.params
		const profile = await ProfileService.followUser(username, req.userId)
		res.json({ profile })
	} catch (error) {
		res.status(409).json({ message: error.message }) // переделать
	}
}

export const unfollowUser = async (req, res, next) => {
	try {
		const { username } = req.params
		const profile = await ProfileService.unfollowUser(username, req.userId)
		res.json({ profile })
	} catch (error) {
		res.status(409).json({ message: error.message }) // переделать
	}
}
