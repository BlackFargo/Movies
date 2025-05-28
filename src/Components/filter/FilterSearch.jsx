import { useDispatch, useSelector } from 'react-redux'
import { setSearchTerm } from '../../store/slices/moviesSlice'

export default function FilterSearch() {
	const dispatch = useDispatch()
	const searchTerm = useSelector(s => s.movies.searchTerm)

	return (
		<div className='filter__search'>
			<input
				type='text'
				placeholder='Search...'
				value={searchTerm}
				onChange={e => dispatch(setSearchTerm(e.target.value))}
			/>
			<button>
				<i className='fa fa-search' />
			</button>
		</div>
	)
}
