import React from 'react'
import background from '../../assets/images/Blade.jpg'

export default function Banner() {
	return (
		<div>
			<div className='favorites__banner'>
				<div className='gradient__overlay'></div>
				<img src={background} alt='' />
			</div>
		</div>
	)
}
