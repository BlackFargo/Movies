import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createSelector } from '@reduxjs/toolkit'
import { act } from 'react'

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

	async function ({ category, genre = 28, page = 1 }, { rejectWithValue }) {
		let url = `https://api.themoviedb.org/3/discover/movie?with_genres=${genre}&page=${page}`
		if (genre == '100000')
			url = `https://api.themoviedb.org/3/discover/movie?page=${page}`
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
			return rejectWithValue(e.message)
		}
	}
)

export const fetchTrailer = createAsyncThunk(
	'movies/fetchTrailer',
	async function ({ movieId }, { rejectWithValue }) {
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

			const trailer = data.results.find(
				item => item.name === 'Official Trailer'
			)

			return trailer.key
		} catch (e) {
			return rejectWithValue(e.message)
		}
	}
)

export const fetchMovie = createAsyncThunk(
	'movies/fetchMovie',
	async function ({ title }, { rejectWithValue }) {
		try {
			const response = await fetch(
				`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
					title
				)}`,
				{
					headers: {
						'Content-type': 'application/json',
						Authorization: `Bearer ${APIKEY}`,
					},
				}
			)
			if (!response.ok) {
				throw new Error(`Server error`)
			}
			const data = await response.json()

			const updated = data?.results.map(result => {
				const genres = result.genre_ids.map(id => genreMap[id])
				return {
					...result,
					genres,
				}
			})

			return updated[0] || null
		} catch (e) {
			return rejectWithValue(e)
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

		searchTerm: '',
	},
	reducers: {
		setSearchTerm(state, action) {
			state.searchTerm = action.payload
		},
	},
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
					const merged = [...state.movies, ...action.payload]
					const uniqueById = Array.from(
						new Map(merged.map(movie => [movie.id, movie])).values()
					)
					state.movies = uniqueById
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
			.addCase(fetchMovie.pending, (state, action) => {
				state.status = 'loading'
				state.error = null
			})
			.addCase(fetchMovie.fulfilled, (state, action) => {
				state.status = 'resolved'
				state.movies = [action.payload]
			})
			.addCase(fetchMovie.rejected, (state, action) => {
				state.status = 'rejected'
				state.error = action.payload
			})
	},
})

export default moviesSlice.reducer
export const { setSearchTerm } = moviesSlice.actions

export const selectFilteredMovies = createSelector(
	state => state.movies.movies,
	state => state.movies.searchTerm,
	(movies, term) => {
		const t = term.trim().toLowerCase()
		return t
			? movies.filter(m => m.title.toLowerCase().includes(t))
			: movies.slice(0, movies.length)
	}
)
