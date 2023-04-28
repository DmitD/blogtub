import { validationResult } from 'express-validator'
import { OAuth2Client, UserRefreshClient } from 'google-auth-library'
import jwt from 'jsonwebtoken'
import ApiError from '../exceptions/api-error.js'
import UserService from '../services/user-service.js'
import User from '../models/user-model.js'

export const signup = async (req, res, next) => {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return next(ApiError.BadRequest('Validation error', errors.array()))
		}
		const { email, password, confirmPassword, firstName, lastName } = req.body
		const userData = await UserService.signup(
			email,
			password,
			confirmPassword,
			firstName,
			lastName
		)
		res.cookie('refreshToken', userData.refreshToken, {
			maxAge: 30 * 24 * 60 * 60 * 1000,
			httpOnly: true,
		})
		return res.json(userData)
	} catch (e) {
		next(e)
	}
}

export const activate = async (req, res, next) => {
	try {
		const activationLink = req.params.link
		await UserService.activation(activationLink)
		return res.redirect(process.env.CLIENT_URL)
	} catch (e) {
		next(e)
	}
}

export const signin = async (req, res, next) => {
	try {
		const { email, password } = req.body
		const userData = await UserService.signin(email, password)
		res.cookie('refreshToken', userData.refreshToken, {
			maxAge: 30 * 24 * 60 * 60 * 1000,
			httpOnly: true,
		})
		return res.json(userData)
	} catch (e) {
		next(e)
	}
}

export const logout = async (req, res, next) => {
	try {
		const { refreshToken } = req.cookies
		const token = await UserService.logout(refreshToken)
		res.clearCookie('refreshToken')
		return res.json(token)
	} catch (e) {
		next(e)
	}
}

export const refresh = async (req, res, next) => {
	try {
		const { refreshToken } = req.cookies
		const userData = await UserService.refresh(refreshToken)
		res.cookie('refreshToken', userData.refreshToken, {
			maxAge: 30 * 24 * 60 * 60 * 1000,
			httpOnly: true,
		})
		return res.json(userData)
	} catch (e) {
		next(e)
	}
}

export const signinGoogle = async (req, res, next) => {
	try {
		const code = req.body.code
		const oAuth2Client = new OAuth2Client(
			process.env.CLIENT_ID,
			process.env.CLIENT_SECRET,
			'postmessage'
		)
		const { tokens } = await oAuth2Client.getToken(code) // exchange code for tokens

		const userData = jwt.decode(tokens.id_token)
		const existingUser = await User.findOne({ email: userData.email })
		if (!existingUser) {
			await User.create({
				username: userData.name,
				email: userData.email,
				isActivated: userData.email_verified,
				image: userData.picture,
			})
		}

		res.cookie('refreshToken', tokens.refresh_token, {
			httpOnly: true,
		})
		return res.json(tokens)
	} catch (e) {
		next(e)
	}
}

export const refreshGoogle = async (req, res, next) => {
	try {
		const user = new UserRefreshClient(
			process.env.CLIENT_ID,
			process.env.CLIENT_SECRET,
			req.cookies.refreshToken
		)
		const { credentials } = await user.refreshAccessToken()
		return res.json(credentials)
	} catch (e) {
		next(e)
	}
}
