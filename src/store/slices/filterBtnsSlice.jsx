import { createSlice } from '@reduxjs/toolkit'

const filterBtnsSlice = createSlice({
	name: 'filterBtnsSlice',
	initialState: 'All',
	reducers: {
		setCategory(state, action) {
			return action.payload
		},
	},
})

export default filterBtnsSlice.reducer
export const { setCategory } = filterBtnsSlice.actions
