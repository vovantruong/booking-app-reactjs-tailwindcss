require('dotenv').config()
const mongoose = require('mongoose')

const connectDB = async () => {
	try {
		await mongoose.connect(
			`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@booking-app.m00mn4t.mongodb.net/booking?retryWrites=true&w=majority`
		)
		console.log('Connected MongoDB successfully!!')
	} catch (error) {
		console.log(error)
		process.exit(1)
	}
}

module.exports = connectDB