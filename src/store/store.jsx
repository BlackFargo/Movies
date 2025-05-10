import { configureStore } from '@reduxjs/toolkit'
import moviesSlice from './slices/moviesSlice'
import filterSlice from './slices/filterSlice'
import authSlice from './slices/authSlice'

export const store = configureStore({
	reducer: {
		movies: moviesSlice,
		filter: filterSlice,
		auth: authSlice,
	},
})
