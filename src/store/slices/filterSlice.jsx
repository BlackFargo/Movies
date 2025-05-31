import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
	name: 'filtreSlice',
	initialState: { genre: 'All' },
	reducers: {
		setCategory(state, action) {
			state['category'] = action.payload.category
		},
		setPage(state, action) {
			state['page'] = action.payload.page
		},
		setGenre(state, action) {
			state['genre'] = action.payload.genre
		},
	},
})

export default filterSlice.reducer
export const { setCategory, setPage, setGenre } = filterSlice.actions
