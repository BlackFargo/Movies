import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCategory } from '../../store/slices/filterSlice'
import { useLocation } from 'react-router-dom'

const filter__categoryes = ['Popular', 'Top Rated', 'Short films']

export default function FilterCategories() {
	const [status, changeStatus] = useState('Popular')
	const state = useSelector(state => state.filter)
	const dispatch = useDispatch()

	const location = useLocation()

	let isDisabled = location.pathname === '/favorites' ? 'disabled' : ''

	useEffect(() => {
		dispatch(setCategory({ category: status }))
	}, [status])

	return (
		<div id='categoryes' className='filter__categoryes anchor'>
			<div className='filter__categoryes-flex'>
				{filter__categoryes.map((value, index) => {
					return (
						<div
							style={{
								pointerEvents: isDisabled ? 'none' : 'auto',
								opacity: isDisabled ? 0.5 : 1,
								cursor: isDisabled ? 'not-allowed' : 'pointer',
							}}
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
