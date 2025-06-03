import facebook from '../../assets/icons/icons8-facebook-новый-144.png'
import instagram from '../../assets/icons/icons8-instagram-144.png'
import youtube from '../../assets/icons/icons8-youtube-144.png'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'

export default function Footer() {
	return (
		<footer>
			<div className='footer__padding'>
				<div className='site__info'>
					<p>TrailerNest</p>
					<div>
						<img src={facebook} alt='' />
						<img src={instagram} alt='' />
						<img src={youtube} alt='' />
					</div>
				</div>
				<div className='footer__hrefs'>
					<div>
						<p>Main</p>
						<p>Topic</p>
						<p>Topic</p>
						<p>Topic</p>
					</div>
					<div>
						<Link to='/faq'>FAQ</Link>
						<HashLink smooth to='/faq#trailerNestQuestion'>
							What is TrailerNest?
						</HashLink>
						<p>How do I remove a like?</p>
						<p>How do I contact support?</p>
					</div>
					<div>
						<p>Reports</p>
						<p>Topic</p>
						<p>Topic</p>
						<p>Topic</p>
					</div>
				</div>
			</div>
		</footer>
	)
}
