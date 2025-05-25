import { setDoc, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from './firebaseConfing'
import { auth } from './firebaseConfing'
import { updatePassword } from 'firebase/auth'
import { EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth'
import { deleteUser } from 'firebase/auth'

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

export const updateRank = async (uid, newRank) => {
	try {
		await updateDoc(doc(db, 'users', uid), {
			rank: newRank,
		})
	} catch (e) {
		console.error(`Error: ${e}`)
	}
}

export const deleteAccount = async () => {
	const user = auth.currentUser
	if (!user) return

	try {
		await deleteUser(user)
	} catch (error) {
		if (error.code === 'auth/requires-recent-login') {
			const password = window.prompt(
				'Для удаления аккаунта, пожалуйста, введите пароль:'
			)
			if (!password) {
				console.log('Переаутентификация отменена')
				return
			}
			const credential = EmailAuthProvider.credential(user.email, password)
			try {
				await reauthenticateWithCredential(user, credential)

				await deleteUser(user)
			} catch (reauthError) {
				console.error(
					'Не удалось переаутентифицировать или удалить:',
					reauthError
				)
				return
			}
		} else {
			console.error('Ошибка при удалении пользователя:', error)
			return
		}
	}

	try {
		const ref = doc(db, 'users', user.uid)
		await deleteDoc(ref)
		console.log('Пользователь и его данные удалены')
	} catch (dbError) {
		console.error('Ошибка при удалении документа:', dbError)
	}
}
