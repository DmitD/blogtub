import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import User from '../models/user-model.js'
import UserDto from '../dtos/user-dto.js'
import MailService from './mail-service.js'
import TokenService from './token-service.js'

class UserService {
	async signup(email, password, confirmPassword, firstName, lastName) {
		const existingUser = await User.findOne({ email })
		if (existingUser) {
			throw ApiError.BadRequest('User already exists')
		}
		if (password !== confirmPassword) {
			throw ApiError.BadRequest("Passwords don't match")
		}
		const hashedPassword = await bcrypt.hash(password, 12)
		const activationLink = uuidv4()
		const result = await User.create({
			email,
			password: hashedPassword,
			username: `${firstName} ${lastName}`,
			activationLink,
		})
		await MailService.sendActivationMail(
			email,
			`${process.env.API_URL}/api/user/activate/${activationLink}`
		)
		const userDto = new UserDto(result)
		const tokens = TokenService.generateTokens({ ...userDto })
		await TokenService.saveToken(userDto.id, tokens.refreshToken)
		return { ...tokens, user: userDto }
	}

	async activation(activationLink) {
		const user = await User.findOne({ activationLink })
		if (!user) {
			throw ApiError.BadRequest('Incorrect activation link')
		}
		user.isActivated = true
		await user.save()
	}

	async signin(email, password) {
		const existingUser = await User.findOne({ email })
		if (!existingUser) {
			throw ApiError.BadRequest("User doesn't exist")
		}
		const isPasswordCorrect = await bcrypt.compare(
			password,
			existingUser.password
		)
		if (!isPasswordCorrect) {
			throw ApiError.BadRequest('Invalid credentials')
		}
		const userDto = new UserDto(existingUser)
		const tokens = TokenService.generateTokens({ ...userDto })
		await TokenService.saveToken(userDto.id, tokens.refreshToken)
		return { ...tokens, user: userDto }
	}

	async logout(refreshToken) {
		const token = await TokenService.removeToken(refreshToken)
		return token
	}

	async refresh(refreshToken) {
		if (!refreshToken) {
			return ApiError.UnauthorizedError()
		}
		const userData = TokenService.validateRefreshToken(refreshToken)
		const tokenFromDb = await TokenService.findToken(refreshToken)
		if (!userData || !tokenFromDb) {
			throw ApiError.UnauthorizedError()
		}
		const existingUser = await User.findById(userData.id)
		const userDto = new UserDto(existingUser)
		const tokens = TokenService.generateTokens({ ...userDto })

		await TokenService.saveToken(userDto.id, tokens.refreshToken)
		return { ...tokens, user: userDto }
	}

	async addArticleToUser(userId, articleId) {
		await User.findByIdAndUpdate(
			userId,
			{ $push: { articles: articleId } },
			{ new: true, useFindAndModify: false }
		)
	}
}

export default new UserService()
