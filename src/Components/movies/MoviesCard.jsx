import React, { useEffect } from 'react'
import starImage from '../../assets/icons/star.png'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Rating from '../movie/Rating'
export default function MoviesCard({ img, rating, movieTitle }) {
	return (
		<Link className='movies__card' to={`/movie/${movieTitle}`}>
			<div className='movies__card-rating'>
				<Rating rating={rating} />
			</div>
			<img src={img} alt='poster' />
		</Link>
	)
}
