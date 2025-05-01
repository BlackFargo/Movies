import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './Components/Layout/Header'
import Footer from './Components/Layout/Footer'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import Movie from './pages/Movie'
import NotFound from './pages/NotFound'

function App() {
	return (
		<>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/favorites' element={<Favorites />} />
					<Route path='/movie' element={<Movie />} />
					<Route path='/movie/:movieName' element={<Movie />} />
					<Route path='*' element={<NotFound />} />
				</Routes>
				<Footer />
			</BrowserRouter>
		</>
	)
}

export default App
