import React from 'react'

import Video from '../Components/movie/Video'
import MainInfo from '../Components/movie/MainInfo/MainInfo'
import { useParams } from 'react-router-dom'

export function Movie() {
	return (
		<div className='main'>
			<Video />
			<MainInfo />
		</div>
	)
}
