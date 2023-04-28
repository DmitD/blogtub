import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
	id: { type: String },
	username: { type: String, unique: true, required: true },
	email: { type: String, unique: true, required: true },
	password: { type: String },
	isActivated: { type: Boolean, default: false },
	activationLink: { type: String },
	image: {
		type: String,
		default: 'http://localhost:5000/api/images/user-avatar.svg',
	},
	favorites: {
		type: [String],
		default: [],
	},
	followedBy: {
		type: [String],
		default: [],
	},
	following: {
		type: [String],
		default: [],
	},
	comments: {
		type: [String],
		default: [],
	},
})

export default mongoose.model('User', userSchema)
