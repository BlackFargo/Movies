import React from 'react'

export default function FilterSearch() {
	return (
		<div className='filter__search'>
			<input type='text' placeholder='Search...' />
			<button>
				<i className='fa fa-search'></i>
			</button>
		</div>
	)
}
