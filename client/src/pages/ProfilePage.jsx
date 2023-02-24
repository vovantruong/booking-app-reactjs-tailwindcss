import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { UserContext } from '../../hooks/useContext'
import PlacesPage from './PlacesPage'
import AccountNav from '../components/AccountNav';

const ProfilePage = () => {
	const [redirect, setRedirect] = useState(null)
	const { user, ready, setUser } = useContext(UserContext)

	let { subpage } = useParams()
	if (subpage === undefined) {
		subpage = 'profile'
	}

	// ----------------- LOGOUT ------------------------ //
	const handlogout = async () => {
		await axios.post('/logout')
		setRedirect('/')
		setUser(null)
	}

	if (!ready) {
		return 'Loading...'
	}

	if (ready && !user && !redirect) {
		return <Navigate to={'/login'} />
	}

	if (redirect) {
		return <Navigate to={redirect} />
	}

	return (
		<div>
			<AccountNav />
			{subpage === 'profile' && (
				<div className="text-center max-w-lg mx-auto">
					Logged in as <span className='font-bold'>{user.name}</span> ({user.email}) <br />
					<button onClick={handlogout} className="primary max-w-sm mt-2">
						Logout
					</button>
				</div>
			)}

			{/* {subpage === 'places' && <PlacesPage />} */}
		</div>
	)
}

export default ProfilePage
