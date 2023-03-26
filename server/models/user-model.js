import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
	id: { type: String },
	name: { type: String, unique: true, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	isActivated: { type: Boolean, default: false },
	activationLink: { type: String },
	articles: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Article',
		},
	],
	favorites: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Article',
		},
	],
	followedBy: {
		type: [String],
		default: [],
	},
	following: {
		type: [String],
		default: [],
	},
	comments: [String],
})

export default mongoose.model('User', userSchema)
