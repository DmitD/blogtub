import jwt from 'jsonwebtoken'
import TokenService from '../services/token-service.js'
import ApiError from '../exceptions/api-error.js'

const authMiddleware = (req, res, next) => {
	try {
		const authorizationHeader = req.headers.authorization
		if (!authorizationHeader) {
			return next(ApiError.UnauthorizedError())
		}

		const accessToken = authorizationHeader.split(' ')[1]
		if (!accessToken) {
			return next(ApiError.UnauthorizedError())
		}

		let userData

		const isCustomAuth = accessToken.length < 500

		if (accessToken && isCustomAuth) {
			userData = TokenService.validateAccessToken(accessToken) // user token
			req.userId = userData.id
		}

		if (accessToken && !isCustomAuth) {
			userData = jwt.decode(accessToken) // google token
			req.userId = userData.sub
		}

		if (!userData) {
			return next(ApiError.UnauthorizedError())
		}

		if (!userData) {
			return next(ApiError.UnauthorizedError())
		}

		next()
	} catch (e) {
		return next(ApiError.UnauthorizedError())
	}
}

export default authMiddleware
