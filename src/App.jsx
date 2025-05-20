import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './Components/Layout/Header'
import Footer from './Components/Layout/Footer'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import Movie from './pages/Movie'
import NotFound from './pages/NotFound'
import Registration from './pages/registration/Registration'
import UserPage from './pages/userPage/UserPage'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import checkUserAuth from './utils/checkUserAuth'
import { likesActions } from './store/slices/likedMoviesSlice'
import { useSelector } from 'react-redux'
import { getMoviesIds } from './firebase/firebaseFunctions'
function App() {
	const dispatch = useDispatch()
	const authState = useSelector(state => state.auth)

	useEffect(() => {
		if (!authState.user?.uid) return

		const fetchAndSetLikes = async () => {
			try {
				const ids = await getMoviesIds()

				dispatch(likesActions.getLikedMovies(ids))
			} catch (err) {
				console.error('Ошибка при загрузке лайков:', err)
			}
		}
		fetchAndSetLikes()
	}, [authState.user?.uid])

	useEffect(() => {
		const fetchAndSetLikes = async () => {
			try {
				const ids = await getMoviesIds()

				dispatch(likesActions.getLikedMovies(ids))
			} catch (err) {
				console.error('Ошибка при загрузке лайков:', err)
			}
		}
		fetchAndSetLikes()
	}, [])

	useEffect(() => {
		checkUserAuth(dispatch)
	}, [])
	return (
		<>
			<BrowserRouter>
				<Header />
				{/* <main> */}
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/favorites' element={<Favorites />} />
					<Route path='/movie' element={<Movie />} />
					<Route path='/movie/:movieName' element={<Movie />} />
					<Route path='/sign-in' element={<Registration />} />
					<Route path='/user' element={<UserPage />} />
					<Route path='*' element={<NotFound />} />
				</Routes>
				{/* </main> */}
				<Footer />
			</BrowserRouter>
		</>
	)
}

export default App
