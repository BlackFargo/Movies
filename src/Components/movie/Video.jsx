import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchTrailer } from '../../store/slices/moviesSlice'

export default function Video() {
	const movieState = useSelector(state => state.movies)
	const trailerState = useSelector(state => state.movies.trailerKey)
	const dispatch = useDispatch()

	const { movieName } = useParams()

	const moviedata = movieState?.movies.find(movie => movie.title === movieName)

	useEffect(() => {
		dispatch(fetchTrailer({ movieId: moviedata?.id }))
	}, [moviedata])

	useEffect(() => {
		console.log(trailerState)
		console.log(moviedata)
	}, [moviedata])
	if (movieState.status === 'loading') {
		return <h1 style={{ color: 'white' }}>Loading ...</h1>
	}

	return (
		<div className='video-wrapper'>
			{trailerState ? (
				<iframe
					src={`https://www.youtube.com/embed/${trailerState}`}
					frameBorder='0'
					allowFullScreen
				></iframe>
			) : (
				<>
					<img
						src={`https://image.tmdb.org/t/p/w500/${moviedata?.backdrop_path}.jpg`}
						alt='backdrop'
						className='backdrop-image'
					/>
					<h3 className='trailer-text'>Trailer is not availiable</h3>
				</>
			)}
		</div>
	)
}
