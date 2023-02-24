require('dotenv').config({ path: './config.env' })
const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const bcryptSalt = bcrypt.genSaltSync(10)
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const imageDownloader = require('image-downloader')
const multer = require('multer')
const fs = require('fs')

const User = require('./models/User')
const Place = require('./models/Place')
const connectDB = require('./config/connectDB')


app.use(express.json())
app.use(cookieParser())
app.use('/uploads', express.static(__dirname + '/uploads'))

app.use(
	cors({
		credentials: true,
		origin: 'http://127.0.0.1:5173',
	})
)

// Connect database mongodb
// mongoose.connect(process.env.MONGO_URL)
connectDB()
//JWT SECRET
const jwtSecret = 'ahalsdgflwvrfb2bdhf9239ahwrlewarfa'

// ------------------ REGISTER --------------------- //
app.post('/register', async (req, res) => {
	const { name, email, password } = req.body
	try {
		const checkEmail = await User.findOne({ email })

		if (checkEmail) return res.status(400).json({ success: false, message: 'Email already in use' })

		const userDoc = await User.create({
			name,
			email,
			password: bcrypt.hashSync(password, bcryptSalt),
		})

		res.status(200).json({ success: true, message: 'Register successfully', data: userDoc })
	} catch (error) {
		return res.status(500).json({ success: false, message: `Internal server error!. ${error.message}` })
	}
})

// ------------------ LOGIN --------------------- //
app.post('/login', async (req, res) => {
	const { email, password } = req.body
	try {
		const userDoc = await User.findOne({ email })
		if (userDoc) {
			const passOk = bcrypt.compareSync(password, userDoc.password)
			if (passOk) {
				jwt.sign(
					{
						email: userDoc.email,
						id: userDoc._id,
					},
					jwtSecret,
					{},
					(err, token) => {
						if (err) throw err
						res.cookie('token', token).json(userDoc)
					}
				)
			} else {
				res.status(400).json({ success: false, message: 'Email or password is incorrect' })
			}
		} else {
			res.status(400).json({ success: false, message: 'Email does not exist' })
		}
	} catch (error) {
		return res.status(500).json({ success: false, message: `Internal server error!. ${error.message}` })
	}
})

// ------------------ REGISTER --------------------- //
app.get('/profile', (req, res) => {
	const { token } = req.cookies
	if (token) {
		jwt.verify(token, jwtSecret, {}, async (err, userData) => {
			if (err) throw err
			const { name, email, _id } = await User.findById(userData.id)
			res.json({ name, email, _id })
		})
	} else {
		res.json(null)
	}
})

// ------------------ LOGOUT --------------------- //
app.post('/logout', (req, res) => {
	res.cookie('token', '').json({ success: true, message: 'Logout successfully!' })
})

// ------------------ UPLOAD BY LINK --------------------- //
app.post('/upload-by-link', async (req, res) => {
	const { link } = req.body
	const newName = 'photo-' + Date.now() + '.jpg'

	await imageDownloader.image({
		url: link,
		dest: __dirname + '/uploads/' + newName,
	})

	res.json(newName)
})

// ------------------ UPLOAD --------------------- //
const photosMiddleware = multer({ dest: 'uploads/' })
app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
	const uploadedFiles = []
	for (let i = 0; i < req.files.length; i++) {
		const { path, originalname } = req.files[i]
		const parts = originalname.split('.')
		const ext = parts[parts.length - 1]
		const newPath = path + '.' + ext
		fs.renameSync(path, newPath)
		uploadedFiles.push(newPath.replace('uploads\\', ''))
	}
	res.json(uploadedFiles)
})

// ------------------ CREATE PLACES --------------------- //
app.post('/places', (req, res) => {
	const { token } = req.cookies
	const { title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price } = req.body

	try {
		jwt.verify(token, jwtSecret, {}, async (err, userData) => {
			if (err) throw err
			const placesDoc = await Place.create({
				owner: userData.id,
				title,
				address,
				photos: addedPhotos,
				description,
				perks,
				extraInfo,
				checkIn,
				checkOut,
				maxGuests,
				price
			})

			res.status(200).json({ success: true, message: 'Create places successfully!', data: placesDoc })
		})
	} catch (error) {
		return res.status(500).json({ success: false, message: `Internal server error!. ${error.message}` })
	}
})

// ------------------ GET PLACES --------------------- //
app.get('/places', (req, res) => {
	const { token } = req.cookies
	jwt.verify(token, jwtSecret, {}, async (err, userData) => {
		if (err) throw err
		const { id } = userData

		res.json(await Place.find({ owner: id }))
	})
})

// ------------------ GET PLACE BY ID --------------------- //
app.get('/places/:id', async (req, res) => {
	const { id } = req.params
	res.json(await Place.findById(id))
})

// ------------------ UPDATE PLACES --------------------- //
app.put('/places', async (req, res) => {
	const { token } = req.cookies
	const { id, title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price } = req.body

	jwt.verify(token, jwtSecret, {}, async (err, userData) => {
		if (err) throw err
		const placeDoc = await Place.findById(id)

		if (userData.id === placeDoc.owner.toString()) {
			placeDoc.set({
				title,
				address,
				photos: addedPhotos,
				description,
				perks,
				extraInfo,
				checkIn,
				checkOut,
				maxGuests,
				price
			})
			await placeDoc.save()
			res.status(200).json({ success: true, message: 'Update places successfully!'})
		}
	})
})

app.listen(4000)
