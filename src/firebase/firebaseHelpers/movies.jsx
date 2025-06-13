import { setDoc, doc, getDoc } from 'firebase/firestore'
import { db, auth } from '../firebaseConfing'

export const sendMoviesIds = async ids => {
	const id = auth?.currentUser?.uid
	if (!id) return

	await setDoc(doc(db, 'moviesIds', id), { ids })
	return { status: 'ok' }
}

export const getMoviesIds = async () => {
	const id = auth?.currentUser?.uid
	if (!id) return

	const docRef = doc(db, 'moviesIds', id)
	const docSnap = await getDoc(docRef)

	if (!docSnap.exists()) throw new Error(`Документ с id=${id} не найден`)
	return docSnap.data()?.ids
}
