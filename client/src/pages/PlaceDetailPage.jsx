import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const PlaceDetailPage = () => {
	const { id } = useParams()
	const [place, setPlace] = useState(null)
	const [showAllPhotos, setShowAllPhotos] = useState(false)

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

	if (showAllPhotos) {
		return (
			<div className="absolute inset-0 bg-black min-w-full min-h-screen overflow-auto">
				<div className="p-8 grid gap-4">
					<div>
						<h2 className="text-white text-2xl font-medium">
							Photos of <span className="font-normal underline">{place.title}</span>
						</h2>
						<button
							onClick={() => setShowAllPhotos(false)}
							className="fixed top-8 right-12 inline-flex gap-1 py-2 px-4 rounded-2xl shadow shadow-gray-500"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6"
							>
								<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
							</svg>
							Close photos
						</button>
					</div>
					{place?.photos?.length > 0 &&
						place.photos.map((photo) => (
							<div className="md:w-3/4 sm:w-full m-auto">
								<img className="m-auto" src={'http://localhost:4000/uploads/' + photo} alt="..." />
							</div>
						))}
				</div>
			</div>
		)
	}

	return (
		<div className="mt-4 bg-gray-100 -mx-8 px-8 py-8">
			<h1 className="text-3xl">{place.title}</h1>
			<a
				className="my-2 block font-semibold underline flex items-center"
				href={'https://maps.google.com/?q=' + place.address}
				target="_blank"
			>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
					<path
						fillRule="evenodd"
						d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
						clipRule="evenodd"
					/>
				</svg>
				{place.address}
			</a>
			<div className="relative">
				<div className="grid gap-2 grid-cols-[2fr_1fr] mt-8 rounded-3xl overflow-hidden">
					<div>
						{place.photos?.[0] && (
							<img
								className="aspect-square object-cover"
								src={'http://localhost:4000/uploads/' + place.photos[0]}
								alt=""
							/>
						)}
					</div>
					<div className="grid">
						{place.photos?.[1] && (
							<img
								className="aspect-square object-cover"
								src={'http://localhost:4000/uploads/' + place.photos[1]}
								alt=""
							/>
						)}
						{place.photos?.[2] && (
							<div className="overflow-hidden">
								<img
									className="aspect-square object-cover relative top-2"
									src={'http://localhost:4000/uploads/' + place.photos[2]}
									alt=""
								/>
							</div>
						)}
					</div>
				</div>
				<button
					onClick={() => setShowAllPhotos(true)}
					type="button"
					className="flex gap-2 items-center bg-white font-medium text-sm absolute bottom-2 right-2 py-2 px-4 shadow shadow-gray-500 rounded-xl"
				>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
						<path d="M18.75 12.75h1.5a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5zM12 6a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 0112 6zM12 18a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 0112 18zM3.75 6.75h1.5a.75.75 0 100-1.5h-1.5a.75.75 0 000 1.5zM5.25 18.75h-1.5a.75.75 0 010-1.5h1.5a.75.75 0 010 1.5zM3 12a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 013 12zM9 3.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zM12.75 12a2.25 2.25 0 114.5 0 2.25 2.25 0 01-4.5 0zM9 15.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
					</svg>
					Show all photos
				</button>
			</div>
			<div className="mt-8 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
				<div>
					<div className="my-4 font-sans">
						<h2 className="font-semibold text-2xl mb-2">Description</h2>
						<p className="text-gray-500">{place.description}</p>
					</div>
					Check-in: {place.checkIn} <br />
					Check-out: {place.checkOut} <br />
					Max number of guest: {place.maxGuests}
				</div>
				<div>
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
									<input type="date" name="" id="" />
								</div>
								<div className="py-3 px-4 border-l">
									<label htmlFor="" className="font-medium">
										Check in:
									</label>
									<input type="date" name="" id="" />
								</div>
							</div>
							<div className="py-3 px-4 border-t">
								<label htmlFor="" className="font-medium">
									Number of guests:
								</label>
								<input type="number" value={1} />
							</div>
						</div>
						<button className="primary mt-4">Book this place</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default PlaceDetailPage
