import React, { useEffect, useState } from 'react'
import { genreIdByName } from '../../utils/genreUtils'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovies } from '../../store/slices/moviesSlice'
import UseDebounce from '../../hooks/UseDebounce'
import { getPage } from '../../store/slices/filterSlice'

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
	const [active, setActive] = useState('Action')
	const filterState = useSelector(state => state.filter)
	const movieState = useSelector(state => state.movies)
	const dispatch = useDispatch()

	const debouncedActive = UseDebounce(active)

	const loading = movieState.status === 'loading'

	const controller = new AbortController()

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (debouncedActive && filterState) {
					dispatch(
						fetchMovies({
							category: filterState?.category,
							genre: genreIdByName(active, popularGenreMap),
							page: filterState?.page,
							signal: controller.signal,
						})
					)
				}
			} catch (e) {
				if (e.name !== 'AbourError') {
					console.error('Error fetching movies', error)
				}
			} finally {
			}
		}

		fetchData()
		return () => {
			controller.abort()
		}
	}, [debouncedActive, filterState, dispatch])

	return (
		<div className='filter__buttons'>
			{Object.values(popularGenreMap).map((category, index) => {
				return (
					<button
						key={index}
						className={`${active === category ? 'active' : ''}`}
						onClick={() => {
							setActive(category)
							dispatch(getPage({ page: 1 }))
						}}
					>
						{category}
					</button>
				)
			})}
		</div>
	)
}
