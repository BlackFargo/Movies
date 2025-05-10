import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPage } from '../../store/slices/filterSlice'

export default function MoviesScroll() {
	const dispatch = useDispatch()
	const filterCategorystate = useSelector(state => state.filter.category)
	const movieState = useSelector(state => state.movies)
	const [page, setPage] = useState(1)

	const loading = movieState.status === 'loading'

	useEffect(() => {
		setPage(1)
	}, [filterCategorystate])

	const nextPage = () => {
		setPage(prev => prev + 1)
	}

	useEffect(() => {
		dispatch(getPage({ page: page }))
	}, [page])

	return (
		<div className='movies__scroll'>
			<button onClick={nextPage} disabled={loading}>
				{loading ? (
					<div className='round'></div>
				) : (
					<i className='fa-solid fa-arrow-down'></i>
				)}
			</button>
		</div>
	)
}
