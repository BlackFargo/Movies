import React from 'react'

import Video from '../Components/movie/Video'
import MainInfo from '../Components/movie/MainInfo/MainInfo'
import { useParams } from 'react-router-dom'

export default function Movie() {
	return (
		<main>
			<Video />
			<MainInfo />
		</main>
	)
}
