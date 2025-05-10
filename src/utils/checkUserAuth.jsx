import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/firebaseConfing'
import { setUser } from '../store/slices/authSlice'

const checkUserAuth = dispatch => {
	onAuthStateChanged(auth, currentUser => {
		if (currentUser) {
			dispatch(
				setUser({
					email: currentUser.email,
					uid: currentUser.uid,
					displayName: currentUser.displayName || 'No name',
					role: 'user',
					emailVerified: currentUser.emailVerified,
				})
			)
		} else {
			dispatch(setUser(null))
		}
	})
}

export default checkUserAuth
