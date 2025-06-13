import Rating from '../Rating'
import { useSelector, useDispatch } from 'react-redux'
import { updateRank } from '../../../firebase/firebaseHelpers/rank'
import { updateLikes } from '../../../firebase/firebaseHelpers/users'
import { likesActions } from '../../../store/slices/likedMoviesSlice'
import { useEffect } from 'react'
import { sendMoviesIds } from '../../../firebase/firebaseHelpers/movies'
import { auth } from '../../../firebase/firebaseConfing'
import { checkRank } from '../../../utils/checkRank'

export default function MainInfoLeft() {
	const dispatch = useDispatch()
	const movieState = useSelector(state => state.movies)
	const likesState = useSelector(state => state.likes)
	const likesCountState = useSelector(state => state.likes.likesCount)
	const authUser = useSelector(state => state.auth.user)

	useEffect(() => {
		const thresholds = [500, 200, 100, 50, 10]

		const matched = thresholds.find(t => likesCountState >= t)

		if (matched) {
			const newRank = checkRank(matched)
			updateRank(auth.currentUser.uid, newRank)
		}
	}, [likesCountState])

	const moviedata = movieState?.movies[0]

	const movieDate = new Date(moviedata?.release_date).getFullYear()

	const addMovie = moviedata => {
		dispatch(likesActions.addLike(moviedata))
		updateLikes(likesCountState)
	}

	useEffect(() => {
		updateLikes(likesCountState)
	}, [likesCountState])

	useEffect(() => {
		sendMoviesIds(Object.values(likesState.movies))
	}, [likesState.movies])

	return (
		<div className='main__info-left'>
			<div className='main__info-left-title'>
				<p>{moviedata?.title}</p>
			</div>
			<div className='movies__info-rating'>
				<Rating rating={moviedata?.vote_average} />
			</div>
			<div className='main__info-left-categoryes'>
				{moviedata?.adult ? <p>18+</p> : ''}

				{moviedata?.genres
					? moviedata.genres.map((genre, index) => <p key={index}>{genre}</p>)
					: ''}
				{moviedata?.release_date ? <p>{movieDate}</p> : ''}
				<p>HD</p>
			</div>
			<div className='main__info-left-about'>
				<p>Description</p>
				<p>{moviedata?.overview}</p>
			</div>
			<div className='main__info-left-about-actions'>
				<button
					className='like-btn'
					disabled={authUser === null ? 'disabled' : ''}
					onClick={() => {
						addMovie(moviedata)
					}}
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth='1.5'
						stroke='currentColor'
						className='size-6'
						width={24}
						height={24}
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z'
						/>
					</svg>
				</button>

				<button
					className='dislike-btn'
					disabled={authUser === null ? 'disabled' : ''}
					onClick={() => {
						dispatch(likesActions.disLike(moviedata))
					}}
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth='1.5'
						stroke='currentColor'
						class='size-6'
						width={24}
						height={24}
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z'
						/>
					</svg>
				</button>
			</div>
		</div>
	)
}
