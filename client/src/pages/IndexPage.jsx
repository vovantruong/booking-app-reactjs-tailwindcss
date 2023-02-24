import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'

function IndexPage() {
	const [places, setPlaces] = useState([])

	useEffect(() => {
		axios.get('/places').then(({ data }) => {
			setPlaces(data)
		})
	}, [])

	return (
		<div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-8 gap-x-6">
			{places.length > 0 &&
				places.map((place) => (
					<Link to={'/places/'+place._id} key={place._id}>
						<div className="bg-gray-500 overflow-hidden mb-2 rounded-2xl flex">
							{place.photos?.[0] && (
								<img
									className="object-cover aspect-square"
									src={'http://localhost:4000/uploads/' + place.photos[0]}
									alt="..."
								/>
							)}
						</div>
						<h2 className="font-bold truncate">{place.address}</h2>
						<h3 className="text-sm truncate text-gray-500">{place.title}</h3>
						<div className="mt-1 text-sm">
							<span className="font-bold">${place.price}</span> per night
						</div>
					</Link>
				))}
		</div>
	)
}

export default IndexPage
