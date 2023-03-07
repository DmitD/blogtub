// import mongoose from 'mongoose'

// const tokenSchema = mongoose.Schema({
// 	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
// 	refreshToken: { type: String, required: true },
// })

// export default mongoose.model('Token', tokenSchema)

import mongoose from 'mongoose'

const tokenSchema = mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	refreshToken: { type: String, required: true },
})

const Token = mongoose.model('Token', tokenSchema)

export default Token
