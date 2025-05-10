import { deleteUser, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/firebaseConfing'

let verificationTimeout

export const deleteUserIfNotVerified = () => {
	const user = auth.currentUser

	verificationTimeout = setTimeout(async () => {
		if (user && !user.emailVerified) {
			try {
				await deleteUser(user)
				console.log('User account deleted due to unverified email.')
			} catch (e) {
				console.error('Error deleting user:', e)
			}
		}
	}, 5 * 60 * 1000)

	onAuthStateChanged(auth, currentUser => {
		if (currentUser && currentUser.emailVerified) {
			clearTimeout(verificationTimeout)
			console.log('Email is verified, no need to delete the account')
		}
	})
}
