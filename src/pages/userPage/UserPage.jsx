import './UserPage.module.scss'
import { useSelector } from 'react-redux'
import { auth } from '../../firebase/firebaseConfing'
import { useEffect } from 'react'

export default function UserPage() {
	useEffect(() => {
		console.log(auth.currentUser)
	}, [auth])
	const authState = useSelector(state => state.auth)
	return (
		<div style={{ padding: '200px', color: 'white' }}>
			<img
				src='https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png'
				style={{ width: '200px', borderRadius: '50%' }}
			/>
			<h1>{authState.user?.displayName || 'Nickname'}</h1>
			<p>{authState.user?.role || 'user'}</p>
			<p>
				{authState.user?.emailVerified
					? ''
					: 'в течении 5 минут потвердите почту либо же аккаунт будет удален'}
			</p>
		</div>
	)
}
