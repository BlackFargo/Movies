import video from '../../assets/videos/Titanik.mp4'
import header_banner from '../../assets/images/background.jpg'
import { ReactTyped } from 'react-typed'
import { Link } from 'react-router-dom'

export default function Banner() {
	return (
		<div className='header__banner'>
			<div>
				<p>
					<ReactTyped
						strings={['TrailerNest']}
						typeSpeed={150}
						backSpeed={100}
						backDelay={1000}
						loop={true}
					/>
				</p>
				<p>
					Feel the magic of movies right here: we curate the most thrilling
					trailers, hot-off-the-press news, and exclusive picks so you never
					miss a hit—dive into on-screen adventures and discover the stories
					that will inspire you!
				</p>
				<div>
					<a href='#movies'>Movies</a>
					<button>
						<Link to={'/favorites'}>Favorites</Link>
					</button>
				</div>
			</div>
			<video autoPlay muted loop>
				<source src={video} type='video/mp4' />
			</video>
			<img src={header_banner} alt='' />
		</div>
	)
}
