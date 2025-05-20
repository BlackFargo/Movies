import Banner from '../Components/Home/Banner'
import Filter from '../Components/filter/Filter'
import MoviesList from '../Components/Movies/MoviesList'
import MoviesScroll from '../Components/movies/MoviesScroll'

export default function Home() {
	return (
		<div className=''>
			<Banner />
			<div className='container'>
				<Filter />
				<MoviesList />
				<MoviesScroll />
			</div>
		</div>
	)
}
