import './UserPage.module.scss'
import { useDispatch, useSelector } from 'react-redux'

import { logoutUserAsync } from '../../store/slices/authThunks'
import s from './UserPage.module.scss'

export default function UserPage() {
	const dispatch = useDispatch()

	const authState = useSelector(state => state.auth)
	return (
		<div className={s.user_container}>
			<div className={s.user_profile}>
				<ul className={s.user_profile_list}>
					<li>{authState.user?.displayName || 'Nickname'}</li>
					<li>{authState.user?.role || 'user'}</li>
					<li>{authState.user?.email}</li>
					<li>
						<button
							onClick={() => dispatch(logoutUserAsync())}
							className={s.logoutButton}
						>
							Log out
						</button>
					</li>
					<li>
						{' '}
						<p>
							{authState.user?.emailVerified
								? ''
								: 'в течении 5 минут потвердите почту либо же аккаунт будет удален'}
						</p>
					</li>
				</ul>
			</div>
			<div className=''>Liked films:</div>
		</div>
	)
}
