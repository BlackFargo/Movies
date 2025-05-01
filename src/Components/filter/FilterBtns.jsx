import React, { useEffect, useState } from 'react'
import { genreIdByName } from '../../utils/genreUtils'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovies } from '../../store/slices/moviesSlice'

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
	const state = useSelector(state => state.filter)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(
			fetchMovies({
				category: state,
				genre: genreIdByName(active, popularGenreMap),
			})
		)
	}, [state, active])

	return (
		<div className='filter__buttons'>
			{Object.values(popularGenreMap).map((category, index) => {
				return (
					<button
						key={index}
						className={`${active === category ? 'active' : ''}`}
						onClick={() => setActive(category)}
					>
						{category}
					</button>
				)
			})}
		</div>
	)
}
