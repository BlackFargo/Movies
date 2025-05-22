import './UserPage.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUserAsync } from '../../store/slices/authThunks'
import s from './UserPage.module.scss'
import { Link } from 'react-router-dom'
import { auth } from '../../firebase/firebaseConfing'
import { changePassword } from '../../firebase/firebaseFunctions'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

export default function UserPage() {
	const [changePassowordContainer, setChangePasswordContainer] = useState(false)
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm()

	const dispatch = useDispatch()

	const authState = useSelector(state => state.auth)

	const likesState = useSelector(state => state.likes)

	const likesMoviesArray = Object.values(likesState.movies)

	const onChangePassword = handleSubmit(async data => {
		if (!changePassowordContainer) return
		try {
			await changePassword(data.oldPassword, data.newPassword)
			alert('Password was changed successfully')
		} catch (e) {
			console.log(`Error ${e}`)
		}
	})

	return (
		<section className={s.user_container}>
			<div className={s.user_profile}>
				<img
					// src='https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png'
					src='https://media.gqindia.com/wp-content/uploads/2017/09/harvey-specter.jpg'
					className={s.user_profile_img}
				/>
				<div className={s.user_profile_inner}>
					<ul className={s.user_profile_list}>
						<li>
							<span>Nickname:</span> {authState.user?.displayName}
						</li>
						<li>
							<span>Rang:</span> Bog seksa
						</li>
						<li>
							<span>Role:</span> ({authState.user?.role}) Founder
						</li>
						<li>
							<span>Email:</span> {authState.user?.email}
						</li>
						<li>
							{' '}
							<p>
								{auth && auth?.currentUser?.emailVerified
									? ''
									: 'Within the next 5 minutes, please confirm your email address, otherwise your account will be deleted.'}
							</p>
						</li>
					</ul>
					<div className={s.user_profile_functions}>
						<button onClick={() => dispatch(logoutUserAsync())}>Log out</button>

						<div>
							<button
								onClick={() => {
									onChangePassword()
									setChangePasswordContainer(prev => !prev)
								}}
								disabled={isSubmitting}
							>
								Change password
							</button>
							{changePassowordContainer && (
								<div className={s.user_profile_functions_passwords}>
									<label htmlFor='oldPassword'>Current password</label>

									<input
										name='oldPassword'
										id='oldPassword'
										type='password'
										{...register('oldPassword', {
											required: 'Current password is required',
											minLength: {
												value: 8,
												message: 'At lest 6 symbols',
											},
										})}
									/>
									<p className={s.error}>{errors?.oldPassword?.message}</p>
									<label htmlFor='newPassword'>New password</label>
									<input
										name='newPassword'
										id='newPassword'
										type='password'
										{...register('newPassword', {
											required: 'New password is required',
											minLength: {
												value: 8,
												message: 'At lest 8 symbols',
											},
										})}
									/>
									<p className={s.error}>{errors?.newPassword?.message}</p>
								</div>
							)}
						</div>
						<button>Coming soon</button>
						<button>Coming soon</button>
						<button>Coming soon</button>
						<button>Coming soon</button>
					</div>
				</div>
			</div>
			<div className={s.liked_container}>
				<h1 className={s.liked_title}>Liked films</h1>
				<div className={s.liked_movies}>
					{likesMoviesArray &&
						likesMoviesArray.map(movie => {
							return (
								<div className={s.liked_movies_card} key={movie?.id}>
									<Link to={`/movie/${movie?.original_title}`}>
										<h3 className={s.liked_movies_card_title}>
											{movie?.original_title}
										</h3>
										<img
											src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
										/>
									</Link>
								</div>
							)
						})}
				</div>
			</div>
		</section>
	)
}
