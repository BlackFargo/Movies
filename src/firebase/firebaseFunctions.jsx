import { collection, addDoc, setDoc, doc } from 'firebase/firestore'
import { db } from './firebaseConfing'
import { auth } from './firebaseConfing'

const id = auth?.currentUser?.uid

export const sendMoviesIds = async ids => {
	await setDoc(doc(db, 'moviesIds', id), { ids })
}
