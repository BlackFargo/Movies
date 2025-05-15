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
	}, [moviedata])

	return (
		<div className='video-wrapper'>
			<iframe
				src={`https://www.youtube.com/embed/${trailerState}`}
				frameborder='0'
				allowfullscreen
			></iframe>
		</div>
	)
}
