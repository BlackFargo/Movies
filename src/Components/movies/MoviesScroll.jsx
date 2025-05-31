import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPage } from '../../store/slices/filterSlice'

export default function MoviesScroll() {
	const dispatch = useDispatch()
	const filterCategorystate = useSelector(state => state.filter.category)
	const movieState = useSelector(state => state.movies)
	const [currentPage, setCurrentPage] = useState(1)

	const loading = movieState.status === 'loading'

	useEffect(() => {
		setCurrentPage(1)
	}, [filterCategorystate])

	const nextPage = () => {
		setCurrentPage(prev => prev + 1)
	}

	useEffect(() => {
		dispatch(setPage({ page: currentPage }))
	}, [currentPage])

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
