import video from '../../assets/videos/Titanik.mp4'
import header_banner from '../../assets/background.jpg'
import { ReactTyped } from 'react-typed'

export default function Banner() {
	return (
		<div className='header__banner'>
			<div>
				<p>
					<ReactTyped
						strings={['REACT CINEMA']}
						typeSpeed={150}
						backSpeed={100}
						backDelay={1000}
						loop={true}
					/>
				</p>
				<p>
					Subheading that sets up context, shares more info about the website,
					or generally gets people psyched to keep scrolling.
				</p>
				<div>
					<a href='#movies'>Movies</a>
					<button>Favorites</button>
				</div>
			</div>
			<video autoPlay muted loop>
				<source src={video} type='video/mp4' />
			</video>
			<img src={header_banner} alt='' />
		</div>
	)
}
