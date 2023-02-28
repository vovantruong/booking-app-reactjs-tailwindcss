import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AccountNav from '../components/AccountNav'
import PlaceImg from '../components/PlaceImg'

const PlacesPage = () => {
	const [places, setPlace] = useState([])

	useEffect(() => {
		axios.get('/user-places').then(({ data }) => {
			setPlace(data)
		})
	}, [])


	return (
		<>
			<AccountNav />
			<div className="text-center">
				list of all added places <br />
				<Link
					className="inline-flex items-center gap-1 bg-primary text-white py-2 px-4 rounded-full"
					to={'/account/places/new'}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-5 h-5"
					>
						<path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
					</svg>
					Add new place
				</Link>
			</div>
			<div className="mt-4">
				{places.length > 0 &&
					places.map((place) => (
						<Link
							key={place._id}
							to={'/account/places/' + place._id}
							className="flex gap-4 bg-gray-200 p-4 rounded-2xl mb-3"
						>
							<div className="flex w-32 overflow-hidden h-auto bg-gray-300 rounded grow-0 shrink-0">
								<PlaceImg place={place} />
							</div>
							<div className="grow-0 shrink">
								<h2 className="text-xl font-bold">{place.title}</h2>
								<div className="mt-1 text-sm flex items-center">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="currentColor"
										className="w-4 h-4 mr-1 inline text-gray-500"
									>
										<path
											fillRule="evenodd"
											d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
											clipRule="evenodd"
										/>
									</svg>

									<span>{place.address}</span>
								</div>
								<p className="text-sm mt-2 line-clamp-3">{place.description}</p>
							</div>
						</Link>
					))}
			</div>
		</>
	)
}

export default PlacesPage
