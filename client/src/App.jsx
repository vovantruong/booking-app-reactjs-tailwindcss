import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import axios from 'axios'
import { UserContextProvider } from '../hooks/useContext'
import ProfilePage from './pages/ProfilePage'
import PlacesPage from './pages/PlacesPage'
import PlacesFormPage from './pages/PlacesFormPage'
import BookingPage from './pages/BookingPage'
import PlaceDetailPage from './pages/PlaceDetailPage'

axios.defaults.baseURL = 'http://127.0.0.1:4000'
axios.defaults.withCredentials = true

function App() {
	return (
		<UserContextProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<IndexPage />} />
						<Route path="/login" element={<LoginPage />} />
						<Route path="/register" element={<RegisterPage />} />
						<Route path="/account" element={<ProfilePage />} />
						<Route path="/account/bookings" element={<BookingPage />} />
						<Route path="/account/places" element={<PlacesPage />} />
						<Route path="/account/places/new" element={<PlacesFormPage />} />
						<Route path="/account/places/:id" element={<PlacesFormPage />} />
						<Route path="/places/:id" element={<PlaceDetailPage />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</UserContextProvider>
	)
}

export default App
