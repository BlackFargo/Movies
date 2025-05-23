import Filter from '../Components/filter/Filter'

import MoviesScroll from '../Components/movies/MoviesScroll'
import FavoritesList from '../Components/favorites/FavoritesList'
import Banner from '../Components/favorites/Banner'
import { useSelector } from 'react-redux'
import MoviesCard from '../Components/Movies/MoviesCard'

const baseUrl = 'https://image.tmdb.org/t/p/w200/'

export default function Favorites() {
	const likedMovies = useSelector(state => state.likes.movies)

	const category = useSelector(state => state.filterBtns)

	const likedMoviesArray = Object.values(likedMovies)

	const filterByCategories = likedMoviesArray.filter(movie => {
		if (movie.genres.includes(category)) {
			return movie
		}
	})

	return (
		<>
			<Banner />
			<div className='container'>
				<Filter />

				<div className='favorites_movies'>
					<FavoritesList />
					<div className='movies'>
						{filterByCategories
							? filterByCategories.map(movie => {
									return (
										<MoviesCard
											rating={Math.round(movie?.vote_average)}
											key={movie?.id}
											img={
												movie?.poster_path
													? `${baseUrl}${movie?.poster_path}`
													: 'posterPlaceholder'
											}
											movieTitle={movie?.title}
										/>
									)
							  })
							: ''}
					</div>
				</div>

				<MoviesScroll />
			</div>
		</>
	)
}
