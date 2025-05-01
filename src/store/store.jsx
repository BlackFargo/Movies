import { configureStore } from '@reduxjs/toolkit'
import moviesSlice from './slices/moviesSlice'
import filterSlice from './slices/filterSlice'

export const store = configureStore({
	reducer: {
		movies: moviesSlice,
		filter: filterSlice,
	},
})
