import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
	name: 'filtreSlice',
	initialState: '',
	reducers: {
		getCategory(state, action) {
			return (state = action.payload)
		},
	},
})

export default filterSlice.reducer
export const { getCategory } = filterSlice.actions
