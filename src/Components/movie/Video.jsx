import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { fetchTrailer, fetchMovie } from '../../store/slices/moviesSlice'
import { SkeletonTrailer } from '../skeletons/SkeletonTrailer'

export default function Video() {
	const movieState = useSelector(state => state.movies)
	const trailerState = useSelector(state => state.movies.trailerKey)
	const dispatch = useDispatch()
	const { movieName } = useParams()

	const moviedata = movieState?.movies[0]

	useEffect(() => {
		dispatch(fetchMovie({ title: movieName }))
	}, [movieName, dispatch])

	useEffect(() => {
		if (moviedata?.id) {
			dispatch(fetchTrailer({ movieId: moviedata.id }))
		}
	}, [moviedata, dispatch])

	if (movieState.status === 'loading') {
		return (
			<div className='video-container'>
				<SkeletonTrailer />
			</div>
		)
	}

	if (!trailerState) {
		return (
			<div className='video-container no-trailer'>
				{moviedata?.backdrop_path && (
					<img
						src={`https://image.tmdb.org/t/p/original/${moviedata.backdrop_path}`}
						alt='backdrop'
						className='backdrop-image'
					/>
				)}
				<h3 className='trailer-text'>Trailer is not available</h3>
			</div>
		)
	}

	return (
		<div className='video-container'>
			<div className='video-wrapper'>
				<iframe
					src={`https://www.youtube.com/embed/${trailerState}?autoplay=0&rel=0`}
					frameBorder='0'
					allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
					allowFullScreen
					title='Movie Trailer'
				/>
			</div>
		</div>
	)
}
