import TagService from '../services/tag-service.js'

export const getTagCloud = async (req, res, next) => {
	try {
		const tags = await TagService.getTagCloud()
		res.json({ tags })
	} catch (error) {
		res.status(409).json({ message: error.message })
	}
}
