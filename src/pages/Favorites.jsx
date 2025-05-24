import Filter from '../Components/filter/Filter'
import noMovies from '../assets/images/no movies.png'
import MoviesScroll from '../Components/movies/MoviesScroll'
import FavoritesList from '../Components/favorites/FavoritesList'
import Banner from '../Components/favorites/Banner'
import { useSelector } from 'react-redux'
import MoviesCard from '../Components/Movies/MoviesCard'
import { SkeletonMovie } from '../Components/skeletons/skeletonMovie'

const baseUrl = 'https://image.tmdb.org/t/p/w200/'

export default function Favorites() {
	const likedMovies = useSelector(state => state.likes.movies)
	const status = useSelector(state => state.likes.status)

	const category = useSelector(state => state.filterBtns)

	const likedMoviesArray = Object.values(likedMovies)

	const filterByCategories = likedMoviesArray.filter(movie => {
		if (category === 'All') return likedMoviesArray
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
						{filterByCategories.length ? (
							status === 'loading' ? (
								[...Array(20)].map((_, i) => <SkeletonMovie key={i} />)
							) : (
								filterByCategories.map(movie => {
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
							)
						) : (
							<img src={noMovies} className='noMoviesImg' />
						)}
					</div>
				</div>

				<MoviesScroll />
			</div>
		</>
	)
}
