import React, { useContext, useEffect, useState } from 'react'
import { differenceInCalendarDays } from 'date-fns'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../../hooks/useContext'

const BookingWidget = ({ place }) => {
	const [checkIn, setCheckIn] = useState('')
	const [checkOut, setCheckOut] = useState('')
	const [numberMaxGuests, setNumberMaxGuests] = useState(1)
	const [name, setName] = useState('')
	const [phone, setPhone] = useState('')
	const [redirect, setRedirect] = useState('')

	const { user } = useContext(UserContext)

	useEffect(() => {
		if (user) {
			setName(user.name)
		}
	}, [user])

	let numberOfNights = 0

	if (checkIn && checkOut) {
		numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
	}

	async function handlebooking() {
		if (!checkIn || !checkOut) {
			alert("Please choose 'Check in' and 'Check out'")
		} else {
			const res = await axios.post('/bookings', {
				checkIn,
				checkOut,
				numberMaxGuests,
				name,
				phone,
				place: place._id,
				price: numberMaxGuests * place.price,
			})

			const bookingId = res.data._id
			setRedirect(`/account/bookings/${bookingId}`)
		}
	}

	if (redirect) {
		return <Navigate to={redirect} />
	}

	return (
		<div className="bg-white shadow p-4 rounded-2xl">
			<div className="text-2xl text-center font-medium">
				Price: <span className="text-primary">${place.price}</span> / night
			</div>
			<div className="border rounded-2xl mt-4">
				<div className="flex">
					<div className="py-3 px-4">
						<label htmlFor="" className="font-medium">
							Check in:
						</label>
						<input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
					</div>
					<div className="py-3 px-4 border-l">
						<label htmlFor="" className="font-medium">
							Check out:
						</label>
						<input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
					</div>
				</div>
				<div className="py-3 px-4 border-t">
					<label htmlFor="" className="font-medium">
						Number of guests:
					</label>
					<input type="number" value={numberMaxGuests} onChange={(e) => setNumberMaxGuests(e.target.value)} />
				</div>
				{numberOfNights > 0 && (
					<div className="py-3 px-4 border-t">
						<label htmlFor="" className="font-medium">
							Your full name:
						</label>
						<input type="text" value={name} onChange={(e) => setName(e.target.value)} />
						<label htmlFor="" className="font-medium">
							Your phone number:
						</label>
						<input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
					</div>
				)}
			</div>
			<button className="primary mt-4" onClick={handlebooking}>
				Book this place
				{numberOfNights > 0 && <span className="font-medium">&nbsp;${numberOfNights * place.price}</span>}
			</button>
		</div>
	)
}

export default BookingWidget
