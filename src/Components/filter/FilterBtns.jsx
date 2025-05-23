import { useEffect } from 'react'
import { genreIdByName } from '../../utils/genreUtils'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovies } from '../../store/slices/moviesSlice'
import UseDebounce from '../../hooks/UseDebounce'
import { getPage } from '../../store/slices/filterSlice'
import { setCategory } from '../../store/slices/filterBtnsSlice'

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
}

export default function FilterBtns() {
	const category = useSelector(state => state.filterBtns)
	const { category: catFromFilter, page } = useSelector(state => state.filter)
	const movieState = useSelector(state => state.movies)
	const dispatch = useDispatch()

	const debouncedCategory = UseDebounce(category)

	useEffect(() => {
		const controller = new AbortController()

		const fetchData = async () => {
			try {
				if (debouncedCategory) {
					dispatch(
						fetchMovies({
							category: catFromFilter,
							genre: genreIdByName(debouncedCategory, popularGenreMap),
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
	}, [debouncedCategory, catFromFilter, page, dispatch])

	return (
		<div className='filter__buttons'>
			{Object.values(popularGenreMap).map((cat, idx) => (
				<button
					key={idx}
					className={category === cat ? 'active' : ''}
					onClick={() => {
						dispatch(setCategory(cat))
						dispatch(getPage({ page: 1 }))
					}}
				>
					{cat}
				</button>
			))}
		</div>
	)
}
