import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../firebaseConfing'

export const getRank = async uid => {
	const ref = doc(db, 'users', uid)
	const snap = await getDoc(ref)
	return snap.exists() ? snap.data().rank : null
}

export const updateRank = async (uid, newRank) => {
	await updateDoc(doc(db, 'users', uid), { rank: newRank })
}
