import {
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	orderBy,
	limit,
	updateDoc,
} from 'firebase/firestore'
import { db, auth } from '../firebaseConfing'

export const getUser = async uid => {
	try {
		const ref = doc(db, 'users', uid)
		const user = await getDoc(ref)
		return user.data()
	} catch (e) {
		console.error(e)
		throw e
	}
}

export const getUsers = async () => {
	try {
		const snapshot = await getDocs(collection(db, 'users'))
		return snapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() }))
	} catch (e) {
		console.error(e)
		throw e
	}
}

export const getUsersByLikesDesc = async (limitCount = 50) => {
	const q = query(
		collection(db, 'users'),
		orderBy('moviesCount', 'desc'),
		limit(limitCount)
	)
	const snap = await getDocs(q)
	return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

export const updateLikes = async count => {
	if (!auth?.currentUser?.uid) {
		console.warn('User is not authenticated yet, cannot update likes')
		return
	}

	const userRef = doc(db, 'users', auth.currentUser.uid)
	await updateDoc(userRef, { moviesCount: count })
}
