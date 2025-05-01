import React from 'react'
import notFound from '../assets/notFound.jpg'

export default function NotFound() {
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<img
				src={notFound}
				alt='notFound'
				width={800}
				height={800}
				style={{ borderRadius: '50%' }}
			/>
		</div>
	)
}
