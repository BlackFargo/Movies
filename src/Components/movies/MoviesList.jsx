import MoviesCard from './MoviesCard'
import posterPlaceholder from '../../assets/images/poster-placeholder.png'

import { useSelector } from 'react-redux'
import { SkeletonMovie } from '../skeletons/skeletonMovie'
import { selectFilteredMovies } from '../../store/slices/moviesSlice'
import { useEffect } from 'react'

const baseUrl = 'https://image.tmdb.org/t/p/w200/'

export default function MoviesList() {
	const { movies, status } = useSelector(state => state.movies)

	const test = useSelector(selectFilteredMovies)

	return (
		<div id='movies' className='movies anchor'>
			{status === 'loading'
				? [...Array(20)].map((_, i) => <SkeletonMovie key={i} />)
				: test.map(movie => (
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
				  ))}
		</div>
	)
}
