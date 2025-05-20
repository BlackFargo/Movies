import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const APIKEY = import.meta.env.VITE_API_KEY

const fetchLikedMovies = createAsyncThunk(
	'likedMovies/fetch',
	async ({ movieId }, { rejectWithValue }) => {
		try {
			const response = await fetch(
				`https://api.themoviedb.org/3/movie/${movieId}`,
				{
					method: 'POST',
					headers: {
						'Content-type': 'application/json',
						Authorization: `Bearer ${APIKEY}`,
					},
				}
			)
			if (!response.ok) {
				throw new Error('Server error')
			}
			const data = await response.json()
			return data
		} catch (error) {
			return rejectWithValue(error)
		}
	}
)

const likedMoviesSlice = createSlice({
	name: 'likedMoviesSlice',
	initialState: {
		movies: {},
		status: null,
		error: null,
		loading: null,
		likesCount: null,
	},
	reducers: {
		addLike(state, action) {
			state.movies = { ...state.movies, [action.payload.id]: action.payload }
		},
		getLikedMovies(state, action) {
			const normalized = (action.payload || []).reduce((acc, movie) => {
				if (movie?.id) acc[movie.id] = movie
				return acc
			}, {})
			const likes = Object.keys(normalized).length
			state.likesCount = likes
			state.movies = { ...state.movies, ...normalized }
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchLikedMovies.pending, state => {
				state.loading = 'loading'
				state.error = null
			})
			.addCase(fetchLikedMovies.fulfilled, (state, action) => {
				state.loading = null
				state.movies = action.payload
			})
			.addCase(fetchLikedMovies.rejected, (state, action) => {
				state.loading = 'error'
				state.error = action.payload
			})
	},
})

export const { reducer: LikesSlice, actions: likesActions } = likedMoviesSlice
