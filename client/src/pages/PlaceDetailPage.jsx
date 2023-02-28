import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AddressLink from '../components/AddressLink'
import BookingWidget from '../components/BookingWidget'
import PlaceGallery from '../components/PlaceGallery'

const PlaceDetailPage = () => {
	const { id } = useParams()
	const [place, setPlace] = useState(null)

	useEffect(() => {
		if (!id) {
			return
		}

		axios.get('/places/' + id).then(({ data }) => {
			setPlace(data)
		})
	}, [id])

	if (!place) {
		return 'Loading...'
	}

	return (
		<div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
			<h1 className="text-3xl">{place.title}</h1>
			<AddressLink>
				{place.address}
			</AddressLink>
			<PlaceGallery place={place} />
			<div className="mt-8 mb-8 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
				<div>
					<div className="my-4 font-sans">
						<h2 className="font-semibold text-2xl mb-2">Description</h2>
						<p className="">{place.description}</p>
					</div>
					<div className="font-sans">
						Check-in: {place.checkIn} <br />
						Check-out: {place.checkOut} <br />
						Max number of guest: {place.maxGuests}
					</div>
				</div>
				<BookingWidget place={place} />
			</div>
			<div className="bg-white -mx-8 px-8 py-8 border-t">
				<h2 className="font-semibold text-2xl">Extra Info</h2>
				<p className="mb-4 mt-2 text-sm text-gray-700 leading-4">{place.extraInfo}</p>
			</div>
		</div>
	)
}

export default PlaceDetailPage
