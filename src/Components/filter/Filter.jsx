import FilterBtns from './FilterBtns'
import FilterCategories from './FilterCategories'
import FilterSearch from './FilterSearch'

export default function Filter() {
	return (
		<div className='filter'>
			<FilterCategories />
			<FilterBtns />
			<FilterSearch />
		</div>
	)
}
