import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategory } from '../../store/slices/filterSlice'

const filter__categoryes = ['Popular', 'Top Rated', 'Short films']

export default function FilterCategories() {
	const [status, changeStatus] = useState('Popular')
	const state = useSelector(state => state.filter)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getCategory(status))
	})

	return (
		<div id='categoryes' className='filter__categoryes anchor'>
			<div className='filter__categoryes-flex'>
				{filter__categoryes.map((value, index) => {
					return (
						<div
							key={index}
							onClick={() => changeStatus(value)}
							className={`filter__categoryes-item ${
								value === status ? 'active-category' : ''
							}`}
						>
							<p>{value}</p>
							<span></span>
						</div>
					)
				})}
			</div>
			<span></span>
		</div>
	)
}
