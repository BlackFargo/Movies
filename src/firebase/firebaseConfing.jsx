import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
	apiKey: 'AIzaSyCKXmu2Fp9BsKBwvOED0iwWQkcQWcUaylU',
	authDomain: 'movies-ea8b8.firebaseapp.com',
	projectId: 'movies-ea8b8',
	storageBucket: 'movies-ea8b8.firebasestorage.app',
	messagingSenderId: '539839045563',
	appId: '1:539839045563:web:f0c874b5d5f71713bbae9e',
	measurementId: 'G-NPFTX2YJHK',
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
