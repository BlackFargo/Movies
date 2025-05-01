import React from 'react'

import Filter from '../Components/filter/Filter'
import MoviesList from '../Components/Movies/MoviesList'
import MoviesScroll from '../Components/movies/MoviesScroll'
import FavoritesList from '../Components/favorites/FavoritesList'
import Banner from '../Components/favorites/Banner'

export default function Favorites() {
	return (
		<>
			<Banner />
			<div className='container'>
				<Filter />

				<div className='favorites_movies'>
					<FavoritesList />
					<MoviesList />
				</div>

				<MoviesScroll />
			</div>
		</>
	)
}
