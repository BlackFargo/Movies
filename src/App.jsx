import { BrowserRouter } from 'react-router-dom'
import Header from './Components/Layout/Header'
import Footer from './Components/Layout/Footer'

import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import checkUserAuth from './utils/checkUserAuth'
import { likesActions } from './store/slices/likedMoviesSlice'
import { useSelector } from 'react-redux'

import { getMoviesIds } from './firebase/firebaseHelpers/movies'
import { RoutesConfig } from './routes/RoutesConfig'

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
			<BrowserRouter basename='/Movies'>
				<Header />

				<RoutesConfig />

				<Footer />
			</BrowserRouter>
		</>
	)
}

export default App
