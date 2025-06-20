import { sendEmailVerification, signOut } from 'firebase/auth'
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from 'firebase/auth'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { auth } from '../../../firebase/firebaseConfing'
import { db } from '../../../firebase/firebaseConfing'
import { setDoc, doc, getDoc } from 'firebase/firestore'

import { updateProfile } from 'firebase/auth'
import { serverTimestamp } from 'firebase/firestore'

export const registerUserAsync = createAsyncThunk(
	'auth/registerUser',
	async ({ email, password, nickname }, { rejectWithValue }) => {
		try {
			const userCredentials = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			)

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
				rank: { name: 'Popcorn Rookie', emoji: '🍿' },
				createdAt: serverTimestamp(),
			})

			await sendEmailVerification(userCredentials.user)

			return {
				email: userCredentials.user?.email,
				uid: userCredentials.user?.uid,
				displayName: nickname || 'No name',
				role: 'user',
				emailVerified: userCredentials.user?.emailVerified,
				rank: { name: 'Popcorn Rookie', emoji: '🍿' },
			}
		} catch (err) {
			if (err.code === 'auth/email-already-in-use') {
				return rejectWithValue('Email is already in use')
			}
			if (err.code === 'auth/weak-password') {
				return rejectWithValue('Weak password')
			}

			return rejectWithValue(err.message)
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
			const userRef = doc(db, 'users', userCredentials.user.uid)
			const userDoc = await getDoc(userRef)

			if (!userDoc.exists()) {
				return rejectWithValue('User data not found in Firestore')
			}
			const userData = userDoc.data()
			return {
				email: userCredentials.user?.email,
				uid: userCredentials.user?.uid,
				displayName: userData.displayName || 'No name',
				role: userData?.role || 'user',
				rank: userData?.rank,
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
