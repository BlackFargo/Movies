import './UserPage.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUserAsync } from '../../store/slices/authThunks'
import s from './UserPage.module.scss'
import { SkeletonText } from '../../Components/skeletons/SkeletonText'

import { auth } from '../../firebase/firebaseConfing'
import {
	changePassword,
	deleteAccount,
	getRank,
} from '../../firebase/firebaseFunctions'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'

export default function UserPage() {
	const [currentRank, setCurrentRank] = useState('')
	const [changePassowordContainer, setChangePasswordContainer] = useState(false)
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm()

	const dispatch = useDispatch()

	const authState = useSelector(state => state.auth)

	const onChangePassword = handleSubmit(async data => {
		if (!changePassowordContainer) return
		try {
			await changePassword(data.oldPassword, data.newPassword)
			alert('Password was changed successfully')
		} catch (e) {
			console.log(`Error ${e}`)
		}
	})

	useEffect(() => {
		const fetchRank = async () => {
			try {
				const rank = await getRank(auth?.currentUser?.uid)
				setCurrentRank(rank)
			} catch (error) {
				console.error('Error in fetchRank:', error)
			}
		}

		if (auth?.currentUser?.uid) {
			fetchRank()
		}
	}, [auth.currentUser])

	const isLoading = !authState?.user?.displayName

	return (
		<section className={s.user_container}>
			<div className={s.user_profile}>
				<img
					src='https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png'
					// src='https://media.gqindia.com/wp-content/uploads/2017/09/harvey-specter.jpg'
					className={s.user_profile_img}
				/>
				<div className={s.user_profile_inner}>
					<ul className={s.user_profile_list}>
						{isLoading ? (
							<SkeletonText />
						) : (
							<li>
								<span>Nickname:</span> {authState.user?.displayName}
							</li>
						)}

						{isLoading ? (
							<SkeletonText />
						) : (
							<li>
								<span>Rank: </span>{' '}
								{currentRank && (
									<i>
										{currentRank.name} {currentRank.emoji}
									</i>
								)}
							</li>
						)}
						{isLoading ? (
							<SkeletonText />
						) : (
							<li>
								<span>Role:</span> ({authState.user?.role}) Founder
							</li>
						)}
						{isLoading ? (
							<SkeletonText />
						) : (
							<li>
								<span>Email:</span> {authState.user?.email}
							</li>
						)}

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
						<button onClick={deleteAccount}>Delete account</button>
						<button>Coming soon</button>
						<button>Coming soon</button>
						<button>Coming soon</button>
					</div>
				</div>
			</div>
		</section>
	)
}
