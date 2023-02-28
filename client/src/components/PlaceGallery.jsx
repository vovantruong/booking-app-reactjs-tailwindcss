import React, { useState } from 'react'

const PlaceGallery = ({place}) => {
	const [showAllPhotos, setShowAllPhotos] = useState(false)

    if (showAllPhotos) {
		return (
			<div className="absolute inset-0 bg-black min-w-full min-h-screen overflow-auto">
				<div className="p-8 grid gap-4">
					<div>
						<h2 className="text-white text-2xl font-medium w-3/4 m-auto">
							Photos of <span className="font-normal underline">{place.title}</span>
						</h2>
						<button
							onClick={() => setShowAllPhotos(false)}
							className="fixed top-8 right-12 inline-flex gap-1 py-2 px-4 rounded-xl shadow shadow-gray-500"
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
							Close
						</button>
					</div>
					{place?.photos?.length > 0 &&
						place.photos.map((photo) => (
							<div key={photo} className="md:w-3/4 sm:w-full m-auto">
								<img className="m-auto" src={'http://localhost:4000/uploads/' + photo} alt="..." />
							</div>
						))}
				</div>
			</div>
		)
	}

	return (
		<div className="relative">
			<div className="grid gap-2 grid-cols-[2fr_1fr] mt-8 rounded-3xl overflow-hidden">
				<div>
					{place.photos?.[0] && (
						<img
							onClick={() => setShowAllPhotos(true)}
							className="aspect-square cursor-pointer object-cover w-full"
							src={'http://localhost:4000/uploads/' + place.photos[0]}
							alt=""
						/>
					)}
				</div>
				<div className="grid">
					{place.photos?.[1] && (
						<img
							onClick={() => setShowAllPhotos(true)}
							className="aspect-square cursor-pointer object-cover"
							src={'http://localhost:4000/uploads/' + place.photos[1]}
							alt=""
						/>
					)}
					{place.photos?.[2] && (
						<div className="overflow-hidden">
							<img
								onClick={() => setShowAllPhotos(true)}
								className="aspect-square cursor-pointer object-cover relative top-2"
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
					<path
						fillRule="evenodd"
						d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
						clipRule="evenodd"
					/>
				</svg>
				Show all photos
			</button>
		</div>
	)
}

export default PlaceGallery
