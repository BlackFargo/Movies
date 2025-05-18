import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const genreMap = {
	28: 'Action',
	12: 'Adventure',
	16: 'Animation',
	35: 'Comedy',
	80: 'Crime',
	99: 'Documentary',
	18: 'Drama',
	10751: 'Family',
	14: 'Fantasy',
	36: 'History',
	27: 'Horror',
	10402: 'Music',
	9648: 'Mystery',
	10749: 'Romance',
	878: 'Science Fiction',
	10770: 'TV Movie',
	53: 'Thriller',
	10752: 'War',
	37: 'Western',
}

const APIKEY = import.meta.env.VITE_API_KEY

export const fetchMovies = createAsyncThunk(
	'movies/fetchByGenre',

	async function ({ category, genre = 28, page = 1 }, { rejectedWithValue }) {
		let url = `https://api.themoviedb.org/3/discover/movie?with_genres=${genre}&page=${page}`
		switch (category) {
			case 'Popular':
				url += '&sort_by=popularity.desc'
				break
			case 'Top Rated':
				url += '&sort_by=vote_average.desc'
				break
			case 'Short films':
				url += `&with_runtime.lte=40&sort_by=popularity.desc`
				break
			default:
				url += '&sort_by=popularity.desc'
		}
		try {
			const response = await fetch(url, {
				method: 'GET',
				headers: {
					'Content-type': 'application/json',
					Authorization: `Bearer ${APIKEY}`,
				},
			})
			if (!response.ok) {
				throw new Error(`Server Error!`)
			}
			const data = await response.json()
			const updated = data.results.map(result => {
				const genres = result.genre_ids.map(id => genreMap[id])
				return {
					...result,
					genres,
				}
			})

			return updated
		} catch (e) {
			return rejectedWithValue(e.message)
		}
	}
)

export const fetchTrailer = createAsyncThunk(
	'movies/fetchTrailer',
	async function ({ movieId }, { rejectedWithValue }) {
		try {
			const response = await fetch(
				`https://api.themoviedb.org/3/movie/${movieId}/videos`,
				{
					method: 'GET',
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
			console.log(data)
			const trailer = data.results.find(
				item => item.name === 'Official Trailer'
			)

			return trailer.key
		} catch (e) {
			return rejectedWithValue(e.message)
		}
	}
)

const moviesSlice = createSlice({
	name: 'movieSlice',
	initialState: {
		movies: [],
		trailerKey: '',
		page: 1,
		status: null,
		error: null,
	},
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchMovies.pending, (state, action) => {
				state.status = 'loading'
				state.error = null
			})
			.addCase(fetchMovies.fulfilled, (state, action) => {
				state.status = 'resolved'
				if (action.meta.arg.page === 1) {
					state.page = 1
					state.movies = action.payload
				} else {
					state.page = action.meta.arg.page
					state.movies = [...state.movies, ...action.payload]
				}
			})
			.addCase(fetchMovies.rejected, (state, action) => {
				state.status = 'rejected'
				state.error = action.payload
			})
			.addCase(fetchTrailer.pending, (state, action) => {
				state.status = 'loading'
				state.trailerKey = ''
				state.error = null
			})
			.addCase(fetchTrailer.fulfilled, (state, action) => {
				state.status = 'resolved'
				state.trailerKey = action.payload
			})
			.addCase(fetchTrailer.rejected, (state, action) => {
				state.status = 'rejected'
				state.error = action.payload
			})
	},
})

export default moviesSlice.reducer
