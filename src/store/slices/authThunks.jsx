import { sendEmailVerification, signOut } from 'firebase/auth'
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from 'firebase/auth'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { auth } from '../../firebase/firebaseConfing'
import { db } from '../../firebase/firebaseConfing'
import { setDoc, doc, getDoc } from 'firebase/firestore'
import { deleteUserIfNotVerified } from '../../utils/emailVerification'
import { updateProfile } from 'firebase/auth'

export const registerUserAsync = createAsyncThunk(
	'auth/registerUser',
	async ({ email, password, nickname }, { rejectWithValue }) => {
		try {
			const userCredentials = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			)
			const createdAt =
				new Date(userCredentials.user.metadata.creationTime).getTime() / 1000
			const userRef = doc(db, 'users', userCredentials.user.uid)

			if (userCredentials.user) {
				await updateProfile(userCredentials.user, {
					displayName: nickname || 'No name',
				})
			}

			await setDoc(userRef, {
				email: userCredentials.user?.email,
				uid: userCredentials.user?.uid,
				displayName: nickname || 'No name',
				role: 'user',
				emailVerified: userCredentials.user?.emailVerified,
				createdAt,
			})

			await sendEmailVerification(userCredentials.user)

			deleteUserIfNotVerified(auth.currentUser)

			return {
				email: userCredentials.user?.email,
				uid: userCredentials.user?.uid,
				displayName: nickname || 'No name',
				role: 'user',
				emailVerified: userCredentials.user?.emailVerified,
				createdAt,
			}
		} catch (error) {
			return rejectWithValue(error.message)
		}
	}
)

export const loginUserAsync = createAsyncThunk(
	'auth/loginUser',
	async ({ email, password }, { rejectWithValue }) => {
		try {
			const userCredentials = await signInWithEmailAndPassword(
				auth,
				email,
				password
			)
			const useRef = doc(db, 'users', userCredentials.user.uid)
			const userDoc = await getDoc(useRef)
			const userData = userDoc.data()
			return {
				email: userCredentials.user?.email,
				uid: userCredentials.user?.uid,
				displayName: userData.displayName || 'No name',
				role: userData?.role || user,
			}
		} catch (error) {
			return rejectWithValue(error.message)
		}
	}
)

export const logoutUserAsync = createAsyncThunk(
	'auth/logoutUser',
	async (_, { rejectWithValue }) => {
		try {
			await signOut(auth)
			return null
		} catch (error) {
			return rejectWithValue(error.message)
		}
	}
)
