import header_banner from '../../assets/images/background.jpg'
import { ReactTyped } from 'react-typed'
import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

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

					<Link to={'/favorites'}>Favorites</Link>
				</div>
			</div>

			<iframe
				width='560'
				height='315'
				src='https://www.youtube.com/embed/HcGU4C7Nw2g?autoplay=1&mute=1&loop=1&playlist=HcGU4C7Nw2g&controls=0&modestbranding=1'
				title='YouTube video player'
				frameBorder='0'
				allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
				referrerPolicy='strict-origin-when-cross-origin'
				allowFullScreen
			></iframe>
			<img src={header_banner} alt='' />
		</div>
	)
}
