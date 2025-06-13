import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/firebaseConfing'
import { setUser } from '../store/slices/auth/authSlice'
import { getUser } from '../firebase/firebaseHelpers/users'

const checkUserAuth = dispatch => {
	onAuthStateChanged(auth, async currentUser => {
		if (currentUser) {
			try {
				let profile = await getUser(currentUser.uid)
				dispatch(
					setUser({
						email: currentUser.email,
						uid: currentUser.uid,
						displayName: currentUser.displayName || 'No name',
						role: profile?.role || user,
						emailVerified: currentUser.emailVerified,
					})
				)
			} catch (e) {
				console.error(`Error ${e}`)
			}
		} else {
			dispatch(setUser(null))
		}
	})
}

export default checkUserAuth
