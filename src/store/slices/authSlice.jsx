import { createSlice } from '@reduxjs/toolkit'
import {
	registerUserAsync,
	loginUserAsync,
	logoutUserAsync,
} from './authThunks'

const authSlice = createSlice({
	name: 'authSlice',
	initialState: {
		user: null,
		loading: null,
		error: null,
	},
	reducers: {
		setUser(state, action) {
			state.user = action.payload
		},
		setLoading(state, action) {
			state.loading = action.payload
		},
		setError(state, action) {
			state.error = action.payload
		},
		// setRank(state, action) {
		// 	state.user.rank = action.payload
		// },
	},
	extraReducers: builder => {
		builder
			.addCase(registerUserAsync.pending, state => {
				state.loading = true
			})
			.addCase(registerUserAsync.fulfilled, (state, action) => {
				state.loading = false
				state.user = action.payload
			})
			.addCase(registerUserAsync.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
			.addCase(loginUserAsync.pending, state => {
				state.loading = true
			})
			.addCase(loginUserAsync.fulfilled, (state, action) => {
				state.loading = false
				state.user = action.payload
			})
			.addCase(loginUserAsync.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
			.addCase(logoutUserAsync.pending, state => {
				state.loading = true
			})
			.addCase(logoutUserAsync.fulfilled, state => {
				state.loading = false
				state.user = null
			})
			.addCase(logoutUserAsync.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
	},
})

export const { setUser, setLoading, setError, setRank } = authSlice.actions
export default authSlice.reducer
