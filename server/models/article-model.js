import mongoose from 'mongoose'

const articleSchema = new mongoose.Schema(
	{
		slug: { type: String, unique: true },
		title: String,
		body: String,
		tags: {
			type: [Object],
			default: [],
		},
		authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		favoritedBy: {
			type: [String],
			default: [],
		},
		comments: {
			type: [String],
			default: [],
		},
	},
	{
		timestamps: true,
	}
)

export default mongoose.model('Article', articleSchema)
