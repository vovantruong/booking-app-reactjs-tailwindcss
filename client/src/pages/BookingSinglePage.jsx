import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AddressLink from '../components/AddressLink'
import BookingDates from '../components/BookingDates'
import PlaceGallery from '../components/PlaceGallery'

const BookingSinglePage = () => {
	const [booking, setBooking] = useState(null)
	const { id } = useParams()

	useEffect(() => {
		if (id) {
			axios.get('/bookings').then((res) => {
				const foundBooking = res.data.find(({ _id }) => _id === id)
				if (foundBooking) {
					setBooking(foundBooking)
				}
			})
		}
	}, [])

	if (!booking) {
		return ''
	}

	return (
		<div className="my-8">
			<h1 className="text-3xl">{booking.place.title}</h1>
			<AddressLink className="my-2 block">{booking.place.address}</AddressLink>
			<div className="bg-gray-200 p-6 my-6 rounded-2xl flex justify-between items-center">
				<div>
					<h2 className="text-2xl mb-2 font-medium">Your booking information</h2>
					<BookingDates booking={booking} className="text-sm"/>
				</div>
				<div className='bg-primary p-4 text-white rounded-2xl'>
					<p>Total price:</p>
					<p className='text-3xl'>${booking.price}</p>
				</div>
			</div>
			<PlaceGallery place={booking.place} />
		</div>
	)
}

export default BookingSinglePage
