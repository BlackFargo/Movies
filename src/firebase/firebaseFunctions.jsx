import { setDoc, doc, getDoc } from 'firebase/firestore'
import { db } from './firebaseConfing'
import { auth } from './firebaseConfing'
import { updatePassword } from 'firebase/auth'
import { EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth'

export const sendMoviesIds = async ids => {
	const id = auth?.currentUser?.uid
	try {
		await setDoc(doc(db, 'moviesIds', id), { ids })
		return { status: 'ok' }
	} catch (err) {
		console.error('sendMoviesIds error:', err)
		throw new Error('Не удалось сохранить IDs фильмов')
	}
}

export const getMoviesIds = async () => {
	const id = auth?.currentUser?.uid
	if (!id) return
	try {
		const docRef = doc(db, 'moviesIds', id)
		const docSnap = await getDoc(docRef)

		if (!docSnap.exists()) {
			throw new Error(`Документ с id=${id} не найден`)
		}
		const ids = docSnap.data()?.ids
		console.log('Загружено')
		return ids
	} catch (err) {
		console.error('getMoviesIds error:', err)
		throw new Error('Не удалось загрузить IDs фильмов')
	}
}

export const changePassword = async (currentPassword, newPassword) => {
	const user = auth?.currentUser

	if (!user) throw new Error('Пользователь не залогинен')

	try {
		const cred = EmailAuthProvider.credential(user.email, currentPassword)
		await reauthenticateWithCredential(user, cred)
		await updatePassword(user, newPassword)
		console.log('Password changed')
	} catch (e) {
		console.log(`Error: ${e}`)
	}
}

export const getRank = async uid => {
	try {
		const ref = doc(db, 'users', uid)
		const snap = await getDoc(ref)

		if (snap.exists()) {
			return snap.data().rank
		} else {
			return null
		}
	} catch (error) {
		console.error('Failed to fetch rank:', error)

		return null
	}
}
