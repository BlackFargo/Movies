import React, { useEffect } from 'react'

import Rating from '../Rating'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

export default function MainInfoLeft() {
	const movieState = useSelector(state => state.movies)

	const { movieName } = useParams()

	const moviedata = movieState?.movies.find(movie => movie.title === movieName)

	const movieDate = new Date(moviedata?.release_date).getFullYear()

	return (
		<div className='main__info-left'>
			<div className='main__info-left-title'>
				<p>{moviedata?.title}</p>
			</div>
			<div className='movies__info-rating'>
				<Rating rating={moviedata?.vote_average} />
			</div>
			<div className='main__info-left-categoryes'>
				{moviedata?.adult ? <p>18+</p> : ''}

				{moviedata?.genres
					? moviedata.genres.map((genre, index) => <p key={index}>{genre}</p>)
					: ''}
				{moviedata?.release_date ? <p>{movieDate}</p> : ''}
				<p>HD</p>
			</div>
			<div className='main__info-left-about'>
				<p>Description</p>
				<p>{moviedata?.overview}</p>
			</div>
		</div>
	)
}
