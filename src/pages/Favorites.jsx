import Filter from '../Components/filter/Filter'

import MoviesScroll from '../Components/movies/MoviesScroll'
import FavoritesList from '../Components/favorites/FavoritesList'
import Banner from '../Components/favorites/Banner'
import { useSelector } from 'react-redux'
import MoviesCard from '../Components/Movies/MoviesCard'
import { useEffect } from 'react'

const baseUrl = 'https://image.tmdb.org/t/p/w200/'

export default function Favorites() {
	const likedMovies = useSelector(state => state.likes.movies)

	useEffect(() => {
		console.log(likedMovies)
	}, [likedMovies])

	const likedMoviesArray = Object.values(likedMovies)

	return (
		<>
			<Banner />
			<div className='container'>
				<Filter />

				<div className='favorites_movies'>
					<FavoritesList />
					{likedMoviesArray.map(movie => {
						return (
							<MoviesCard
								rating={Math.round(movie.vote_average)}
								key={movie.id}
								img={
									movie.poster_path
										? `${baseUrl}${movie.poster_path}`
										: posterPlaceholder
								}
								movieTitle={movie.title}
							/>
						)
					})}
				</div>

				<MoviesScroll />
			</div>
		</>
	)
}
