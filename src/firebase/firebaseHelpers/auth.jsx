import { auth, db } from '../firebaseConfing'
import {
	EmailAuthProvider,
	reauthenticateWithCredential,
	deleteUser,
	updatePassword,
	signInWithPopup,
	sendPasswordResetEmail,
} from 'firebase/auth'
import { googleProvider } from '../firebaseConfing'
import {
	doc,
	getDoc,
	setDoc,
	deleteDoc,
	serverTimestamp,
} from 'firebase/firestore'

export const changePassword = async (currentPassword, newPassword) => {
	const user = auth?.currentUser
	if (!user) throw new Error('Пользователь не залогинен')

	const cred = EmailAuthProvider.credential(user.email, currentPassword)
	await reauthenticateWithCredential(user, cred)
	await updatePassword(user, newPassword)
}

export const deleteAccount = async () => {
	const user = auth.currentUser
	if (!user) return

	try {
		await deleteUser(user)
	} catch (error) {
		if (error.code === 'auth/requires-recent-login') {
			// TODO: Replace window.prompt with a proper modal/form for better security
			const password = window.prompt('Введите пароль для удаления аккаунта:')
			if (!password) return

			const credential = EmailAuthProvider.credential(user.email, password)
			await reauthenticateWithCredential(user, credential)
			await deleteUser(user)
		} else {
			throw error
		}
	}

	await deleteDoc(doc(db, 'moviesIds', user.uid))
	await deleteDoc(doc(db, 'users', user.uid))
}

export const signInWithGoogle = async () => {
	const { user } = await signInWithPopup(auth, googleProvider)
	if (!user) return

	const userRef = doc(db, 'users', user.uid)
	const snap = await getDoc(userRef)
	if (snap.exists()) return

	await setDoc(userRef, {
		email: user.email || '',
		uid: user.uid,
		displayName: user.displayName || 'No name',
		role: 'user',
		emailVerified: user.emailVerified,
		rank: { name: 'Popcorn Rookie', emoji: '🍿' },
		createdAt: serverTimestamp(),
	})
}

export const resetPasswordByEmail = async email => {
	try {
		await sendPasswordResetEmail(auth, email)
		return { success: true }
	} catch (e) {
		return { success: false, code: e.code, message: e.message }
	}
}
