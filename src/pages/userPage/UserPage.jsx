import './UserPage.module.scss'
import { useDispatch } from 'react-redux'
import { logoutUserAsync } from '../../store/slices/auth/authThunks'
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

export function UserPage() {
	const dispatch = useDispatch()
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm()

	const userUid = auth?.currentUser?.uid
	const { uid } = useParams()
	const targetUid = uid || userUid
	const isMe = targetUid === userUid

	const [user, setUser] = useState(null)
	const [currentRank, setCurrentRank] = useState(null)
	const [showPasswordForm, setShowPasswordForm] = useState(false)

	useEffect(() => {
		if (!targetUid) return
		setUser(null)
		getUser(targetUid)
			.then(res => setUser(res))
			.catch(console.error)
	}, [targetUid])

	useEffect(() => {
		if (isMe && userUid) {
			setCurrentRank(null)
			getRank(userUid)
				.then(rank => setCurrentRank(rank))
				.catch(console.error)
		}
	}, [isMe, userUid])

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
		if (!user?.displayName) return
		const promptValue = prompt('To confirm, type your username:')
		if (promptValue === user.displayName) {
			deleteAccount()
		}
	}

	if (!user) {
		return (
			<section className={s.user_container}>
				<div className={s.user_profile}>
					<div className={s.user_profile_inner}>
						<ul className={s.user_profile_list}>
							<li>
								<span>Nickname:</span> <SkeletonText />
							</li>
							<li>
								<span>Rank:</span> <SkeletonText />
							</li>
							<li>
								<span>Role:</span> <SkeletonText />
							</li>
							{isMe && (
								<li>
									<span>Email:</span> <SkeletonText />
								</li>
							)}
						</ul>
					</div>
				</div>
			</section>
		)
	}

	return (
		<section className={s.user_container}>
			<div className={s.user_profile}>
				<img src={userImage} className={s.user_profile_img} alt='User avatar' />
				<div className={s.user_profile_inner}>
					<ul className={s.user_profile_list}>
						<li>
							<span>Nickname:</span> {user.displayName}
						</li>
						<li>
							<span>Rank:</span>{' '}
							{isMe ? (
								currentRank ? (
									`${currentRank.name} ${currentRank.emoji}`
								) : (
									<SkeletonText />
								)
							) : user.rank ? (
								`${user.rank.name} ${user.rank.emoji}`
							) : (
								'—'
							)}
						</li>
						<li>
							<span>Likes:</span> {user.moviesCount}
						</li>
						<li>
							<span>Role:</span> {user.role}
						</li>
						{isMe && (
							<li>
								<span>Email:</span> {user.email}
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
				</div>
			)}
		</section>
	)
}
