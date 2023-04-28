import TokenService from '../services/token-service.js'
import ApiError from '../exceptions/api-error.js'

const authOptional = (req, res, next) => {
	try {
		let userData

		if (
			req.headers.authorization &&
			req.headers.authorization.split(' ')[0] === 'Bearer'
		) {
			const accessToken = req.headers.authorization.split(' ')[1]
			userData = TokenService.validateAccessToken(accessToken)
			if (!userData) {
				return next(ApiError.UnauthorizedError())
			}
			req.userId = userData.id
		}

		if (!req.headers.authorization) {
			req.userId = null
		}

		next()
	} catch (e) {
		return next(ApiError.UnauthorizedError())
	}
}

export default authOptional
