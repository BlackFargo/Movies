import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebaseConfing'

export const updateRole = async (uid, newRole) => {
	const userRef = doc(db, 'users', uid)
	await updateDoc(userRef, { role: newRole })
}
