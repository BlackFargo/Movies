import { useEffect } from 'react'
import { genreIdByName } from '../../utils/genreUtils'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovies } from '../../store/slices/moviesSlice'
import { useDebounce } from '../../hooks/useDebounce'
import { setPage } from '../../store/slices/filterSlice'
import { setGenre } from '../../store/slices/filterSlice'
const popularGenreMap = {
	28: 'Action',
	12: 'Adventure',
	35: 'Comedy',
	18: 'Drama',
	878: 'Science Fiction',
	14: 'Fantasy',
	53: 'Thriller',
	10749: 'Romance',
	80: 'Crime',
	27: 'Horror',
	100000: 'All',
}

export default function FilterBtns() {
	const {
		category: catFromFilter,
		page,
		genre,
	} = useSelector(state => state.filter)

	const dispatch = useDispatch()

	const debouncedGenre = useDebounce(genre)

	useEffect(() => {
		const controller = new AbortController()

		const fetchData = async () => {
			try {
				if (debouncedGenre) {
					dispatch(
						fetchMovies({
							category: catFromFilter,
							genre: genreIdByName(debouncedGenre, popularGenreMap),
							page,
							signal: controller.signal,
						})
					)
				}
			} catch (e) {
				if (e.name !== 'AbortError') {
					console.error('Error fetching movies', e)
				}
			}
		}

		fetchData()
		return () => controller.abort()
	}, [debouncedGenre, catFromFilter, page, dispatch])

	return (
		<div className='filter__buttons'>
			{Object.values(popularGenreMap).map((cat, idx) => (
				<button
					key={idx}
					className={genre === cat ? 'active' : ''}
					onClick={() => {
						dispatch(setGenre({ genre: cat }))
						dispatch(setPage({ page: 1 }))
					}}
				>
					{cat}
				</button>
			))}
		</div>
	)
}
