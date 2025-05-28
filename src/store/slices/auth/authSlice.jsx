import { createSlice } from '@reduxjs/toolkit'
import {
	registerUserAsync,
	loginUserAsync,
	logoutUserAsync,
} from './authThunks'

const handlePending = state => {
	state.loading = true
	state.error = null
}
const handleFulfilled = (state, action) => {
	state.loading = false
	state.user = action.payload
}
const handleRejected = (state, action) => {
	state.loading = false
	state.error = action.payload
}

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		user: null,
		loading: false,
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
	},
	extraReducers: builder => {
		builder
			.addCase(registerUserAsync.pending, handlePending)
			.addCase(registerUserAsync.fulfilled, handleFulfilled)
			.addCase(registerUserAsync.rejected, handleRejected)

			.addCase(loginUserAsync.pending, handlePending)
			.addCase(loginUserAsync.fulfilled, handleFulfilled)
			.addCase(loginUserAsync.rejected, handleRejected)

			.addCase(logoutUserAsync.pending, handlePending)
			.addCase(logoutUserAsync.fulfilled, state => {
				state.loading = false
				state.user = null
			})
			.addCase(logoutUserAsync.rejected, handleRejected)
	},
})

export const { setUser, setLoading, setError } = authSlice.actions
export default authSlice.reducer
