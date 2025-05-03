import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const baseurl = 'https://api.themoviedb.org/3/movie/popular?page=1'

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

const APIKEY =
	'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZDI5NmJjNGE4ZTYyOGMyZTE3NzBiY2NiM2QwNTE3YSIsIm5iZiI6MTc0NTU4OTM4NS4wMDgsInN1YiI6IjY4MGI5NDg5MjAwNGJlOTNkOWFhOTRmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EfQ-j_8AY5ZC8yKVOjn1lJIE04bw2sbyDasM0BSTz3I'

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

const moviesSlice = createSlice({
	name: 'movieSlice',
	initialState: {
		movies: [],
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
					state.movies = action.payload
				} else {
					state.movies = [...state.movies, ...action.payload]
				}
			})
			.addCase(fetchMovies.rejected, (state, action) => {
				state.status = 'rejected'
				state.error = action.payload
			})
	},
})

export default moviesSlice.reducer
