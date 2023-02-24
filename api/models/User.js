const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema({
	name: String,
	email: {
		type: String,
		unique: true,
		match: [
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			'Please provide a valid email',
		],
	},
	password: String,
})

const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel
