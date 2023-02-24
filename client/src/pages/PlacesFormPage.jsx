import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import AccountNav from '../components/AccountNav'
import Perks from '../components/Perks'
import PhotoUploader from '../components/PhotoUploader'

const PlacesFormPage = ({}) => {
	const { id } = useParams()
	const [title, setTitle] = useState('')
	const [address, setAddress] = useState('')
	const [addedPhotos, setAddedPhotos] = useState([])
	const [description, setDescription] = useState('')
	const [perks, setPerks] = useState([])
	const [extraInfo, setExtraInfo] = useState('')
	const [checkIn, setCheckIn] = useState('')
	const [checkOut, setCheckOut] = useState('')
	const [maxGuests, setMaxGuests] = useState(1)
	const [price, setPrice] = useState(100)
	const [redirect, setRedirect] = useState(false)

	useEffect(() => {
		if (!id) {
			return
		}

		axios.get('/places/' + id).then(({ data }) => {
			setTitle(data.title)
			setAddress(data.address)
			setAddedPhotos(data.photos)
			setDescription(data.description)
			setPerks(data.perks)
			setExtraInfo(data.extraInfo)
			setCheckIn(data.checkIn)
			setCheckOut(data.checkOut)
			setMaxGuests(data.maxGuests)
			setPrice(data.price)
		})
	}, [])

	function inputHeader(text) {
		return <h2 className="text-xl mt-4">{text}</h2>
	}

	function inputDescription(text) {
		return <p className="text-gray-500 text-sm">{text}</p>
	}

	function preInput(title, description) {
		return (
			<>
				{inputHeader(title)}
				{inputDescription(description)}
			</>
		)
	}

	async function handleActionPlace(e) {
		e.preventDefault()
		const placeData = { title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price }
		if (id) {
			// upadte
			await axios.put('/places', {
				id,
				...placeData
			})

			setRedirect(true)
		} else {
			// create
			await axios.post('/places', placeData)

			setRedirect(true)
		}
	}

	if (redirect) {
		return <Navigate to={'/account/places'} />
	}

	return (
		<>
			<AccountNav />
			<form onSubmit={handleActionPlace}>
				{preInput('Title', 'title for your place, should be short and catchy as in advertisement')}
				<input
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="title, for example: My lovely apt"
				/>
				{preInput('Address', 'Address to this place')}
				<input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="address" />
				{preInput('Photos', 'more = better')}
				<PhotoUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
				{preInput('Description', 'description of the place')}
				<textarea rows="6" value={description} onChange={(e) => setDescription(e.target.value)} />
				{preInput('Perks', 'select all the perks of your place')}
				<div className="grid mt-2 grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6">
					<Perks selected={perks} onChange={setPerks} />
				</div>
				{preInput('Extra info', 'house rules, etc')}
				<textarea rows="6" value={extraInfo} onChange={(e) => setExtraInfo(e.target.value)} />
				{preInput(
					'Check in&out times, max guests',
					'add check in and out times, remember to have some time window for cleaning the room between guets'
				)}
				<div className="grid gap-2 grid-cols-2 md:grid-cols-4">
					<div>
						<h3 className="mt-2 -mb-1">Check im time</h3>
						<input
							type="text"
							value={checkIn}
							onChange={(e) => setCheckIn(e.target.value)}
							placeholder="14"
						/>
					</div>
					<div>
						<h3 className="mt-2 -mb-1">Check out time</h3>
						<input
							type="text"
							value={checkOut}
							onChange={(e) => setCheckOut(e.target.value)}
							placeholder="11"
						/>
					</div>
					<div>
						<h3 className="mt-2 -mb-1">Max number of guests</h3>
						<input type="number" value={maxGuests} onChange={(e) => setMaxGuests(e.target.value)} />
					</div>
					<div>
						<h3 className="mt-2 -mb-1">Price per night</h3>
						<input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
					</div>
				</div>
				<button className="primary my-4">Save</button>
			</form>
		</>
	)
}

export default PlacesFormPage
