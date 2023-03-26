import mongoose from 'mongoose'

const articleSchema = mongoose.Schema({
	slug: { type: String, unique: true },
	title: String,
	body: String,
	tags: {
		type: [Object],
		default: [],
	},
	createdAt: {
		type: Date,
		default: new Date(),
	},
	authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	favoritedBy: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Tag',
		},
	],
	comments: [String],
})

export default mongoose.model('Article', articleSchema)
