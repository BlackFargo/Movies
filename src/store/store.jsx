import { configureStore } from '@reduxjs/toolkit'
import moviesSlice from './slices/moviesSlice'
import filterSlice from './slices/filterSlice'
import authSlice from './slices/authSlice'
import { LikesSlice } from './slices/likedMoviesSlice'
import filterBtnsSlice from './slices/filterBtnsSlice'

export const store = configureStore({
	reducer: {
		movies: moviesSlice,
		filter: filterSlice,
		auth: authSlice,
		likes: LikesSlice,
		filterBtns: filterBtnsSlice,
	},
})
