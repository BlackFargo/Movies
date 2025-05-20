import { setDoc, doc, getDoc } from 'firebase/firestore'
import { db } from './firebaseConfing'
import { auth } from './firebaseConfing'

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
	try {
		const docRef = doc(db, 'moviesIds', id)
		const docSnap = await getDoc(docRef)

		if (!docSnap.exists()) {
			throw new Error(`Документ с id=${id} не найден`)
		}
		const ids = docSnap.data()?.ids

		return ids
	} catch (err) {
		console.error('getMoviesIds error:', err)
		throw new Error('Не удалось загрузить IDs фильмов')
	}
}
