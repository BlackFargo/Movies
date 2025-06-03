import {
	setDoc,
	doc,
	getDoc,
	updateDoc,
	deleteDoc,
	getDocs,
	query,
	collection,
	orderBy,
	limit,
} from 'firebase/firestore'
import { db } from './firebaseConfing'
import { googleProvider } from './firebaseConfing'
import { updatePassword } from 'firebase/auth'
import { EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth'
import { deleteUser } from 'firebase/auth'
import { signInWithPopup } from 'firebase/auth'
import { auth } from './firebaseConfing'
import { sendPasswordResetEmail } from 'firebase/auth'

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
		const moviesRef = doc(db, 'moviesIds', user.uid)
		const usersRef = doc(db, 'users', user.uid)
		await deleteDoc(moviesRef)
		await deleteDoc(usersRef)
	} catch (dbError) {
		console.error('Ошибка при удалении документа:', dbError)
	}
}
export const updateLikes = async count => {
	try {
		const userRef = doc(db, 'users', auth?.currentUser?.uid)
		await updateDoc(userRef, { moviesCount: count })
		return true
	} catch (error) {
		console.error('Ошибка при обновлении likes:', error)

		throw error
	}
}

export const getUsersByLikesDesc = async (limitCount = 50) => {
	try {
		const q = query(
			collection(db, 'users'),
			orderBy('moviesCount', 'desc'),
			limit(limitCount)
		)
		const snap = await getDocs(q)
		return snap.docs.map(d => ({ id: d.id, ...d.data() }))
	} catch (error) {
		console.error('Ошибка при получении пользователей:', error)
		throw error
	}
}

export const getUser = async uid => {
	try {
		const ref = doc(db, 'users', uid)
		const user = await getDoc(ref)

		return user.data()
	} catch (e) {
		console.error(e)
		throw error
	}
}

export const getUsers = async () => {
	try {
		const snapshot = await getDocs(collection(db, 'users'))
		const usersList = snapshot.docs.map(doc => ({
			uid: doc.id,
			...doc.data(),
		}))
		return usersList
	} catch (e) {
		console.error(e)
		throw error
	}
}

export const updateRole = async (uid, newRole) => {
	try {
		const userRef = doc(db, 'users', uid)
		await updateDoc(userRef, { role: newRole })
		return true
	} catch (error) {
		console.error('Updating role error', error)

		throw error
	}
}

export const signInWithGoogle = async () => {
	try {
		// signInWithPopup возвращает { user, … }
		const { user } = await signInWithPopup(auth, googleProvider)

		// user теперь точно не null
		if (!user) return

		// ...далее записываем его в Firestore, если нужно
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
	} catch (e) {
		console.error('signInWithGoogle error:', e)
	}
}

export async function resetPasswordByEmail(email) {
	try {
		const response = await sendPasswordResetEmail(auth, email)
		return { success: true }
	} catch (e) {
		return { success: false, code: e.code, message: e.message }
	}
}
