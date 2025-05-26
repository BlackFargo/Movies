import './UserPage.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUserAsync } from '../../store/slices/authThunks'
import s from './UserPage.module.scss'
import { SkeletonText } from '../../Components/skeletons/SkeletonText'
import {
	getUser,
	changePassword,
	deleteAccount,
	getRank,
} from '../../firebase/firebaseFunctions'
import userImage from '../../assets/images/user.png'
import { auth } from '../../firebase/firebaseConfing'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function UserPage() {
	const [user, setUser] = useState(null)
	const [currentRank, setCurrentRank] = useState(null)
	const [showPasswordForm, setShowPasswordForm] = useState(false)

	const userUid = auth?.currentUser?.uid
	const { uid } = useParams()
	const isMe = userUid === uid

	const dispatch = useDispatch()
	const authState = useSelector(state => state.auth)
	const isLoading = !authState.user?.displayName

	useEffect(() => {
		if (!uid) return
		getUser(uid).then(res => setUser(res))
	}, [uid])

	useEffect(() => {
		if (isMe) {
			getRank(userUid)
				.then(rank => setCurrentRank(rank))
				.catch(console.error)
		}
	}, [isMe, userUid])

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm()

	const onChangePassword = handleSubmit(async data => {
		try {
			await changePassword(data.oldPassword, data.newPassword)
			alert('Password was changed successfully')
		} catch (e) {
			console.error(e)
			alert('Error changing password')
		}
	})

	const confirmAndDeleteAccount = () => {
		const userName = authState.user?.displayName
		if (!userName) return
		const promptValue = prompt('To confirm, type your username:')
		if (promptValue === userName) {
			deleteAccount()
		}
	}

	return (
		<section className={s.user_container}>
			<div className={s.user_profile}>
				<img src={userImage} className={s.user_profile_img} alt='User avatar' />
				<div className={s.user_profile_inner}>
					<ul className={s.user_profile_list}>
						<li>
							<span>Nickname:</span>{' '}
							{isLoading ? (
								<SkeletonText />
							) : isMe ? (
								authState.user.displayName
							) : (
								user?.displayName
							)}
						</li>

						<li>
							<span>Rank:</span>{' '}
							{isLoading ? (
								<SkeletonText />
							) : isMe ? (
								currentRank ? (
									`${currentRank.name} ${currentRank.emoji}`
								) : (
									'—'
								)
							) : user?.rank ? (
								`${user.rank.name} ${user.rank.emoji}`
							) : (
								'—'
							)}
						</li>

						<li>
							<span>Role:</span>{' '}
							{isLoading ? (
								<SkeletonText />
							) : isMe ? (
								authState.user.role
							) : (
								user?.role
							)}
						</li>
						{isMe && (
							<li>
								<span>Email:</span>{' '}
								{isLoading ? <SkeletonText /> : authState?.user?.email}
							</li>
						)}
					</ul>
				</div>
			</div>

			{isMe && (
				<div className={s.user_profile_functions}>
					<button onClick={() => dispatch(logoutUserAsync())}>Log out</button>

					<div className={s.password_div}>
						<button
							onClick={() => setShowPasswordForm(prev => !prev)}
							disabled={isSubmitting}
						>
							Change password
						</button>
						{showPasswordForm && (
							<form
								onSubmit={onChangePassword}
								className={s.user_profile_functions_passwords}
							>
								<label htmlFor='oldPassword'>Current password</label>
								<input
									id='oldPassword'
									type='password'
									{...register('oldPassword', {
										required: 'Required',
										minLength: 6,
									})}
								/>
								<p className={s.error}>{errors.oldPassword?.message}</p>

								<label htmlFor='newPassword'>New password</label>
								<input
									id='newPassword'
									type='password'
									{...register('newPassword', {
										required: 'Required',
										minLength: 8,
									})}
								/>
								<p className={s.error}>{errors.newPassword?.message}</p>

								<button type='submit' disabled={isSubmitting}>
									Save
								</button>
							</form>
						)}
					</div>

					<button onClick={confirmAndDeleteAccount}>Delete account</button>
					<button disabled>Coming soon</button>
					<button disabled>Coming soon</button>
					<button disabled>Coming soon</button>
				</div>
			)}
		</section>
	)
}
