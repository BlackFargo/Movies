import React, { useEffect, useState } from 'react'
import MoviesCard from './MoviesCard'
import posterPlaceholder from '../../assets/images/poster-placeholder.png'

import { useSelector } from 'react-redux'

const baseUrl = 'https://image.tmdb.org/t/p/w200/'

export default function MoviesList() {
	const state = useSelector(state => state.movies)

	useEffect(() => {
		console.log(state)
	}, [state])

	return (
		<div id='movies' className='movies anchor'>
			{state
				? state?.movies.map(movie => {
						return (
							<MoviesCard
								rating={Math.round(movie.vote_average)}
								key={movie.id}
								img={
									movie.poster_path
										? `${baseUrl}${movie.poster_path}`
										: posterPlaceholder
								}
								movieTitle={movie.title}
							/>
						)
				  })
				: ''}
		</div>
	)
}
