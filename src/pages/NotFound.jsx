import React from 'react'
import notFound from '../assets/images/notFound.jpg'

export function NotFound() {
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				padding: '20px',
			}}
		>
			<img
				src={notFound}
				alt='notFound'
				className='notFound_image'
				style={{ borderRadius: '50%', margin: '140px 0' }}
			/>
		</div>
	)
}
