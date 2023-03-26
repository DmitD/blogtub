import mongoose from 'mongoose'

const tagSchema = mongoose.Schema({
	name: String,
	articles: {
		type: [String],
		default: [],
	},
})

export default mongoose.model('Tag', tagSchema)
