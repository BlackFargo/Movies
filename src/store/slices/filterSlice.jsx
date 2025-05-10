import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
	name: 'filtreSlice',
	initialState: {},
	reducers: {
		getCategory(state, action) {
			state['category'] = action.payload.category
		},
		getPage(state, action) {
			state['page'] = action.payload.page
		},
	},
})

export default filterSlice.reducer
export const { getCategory, getPage } = filterSlice.actions
