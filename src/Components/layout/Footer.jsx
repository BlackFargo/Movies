import facebook from '../../assets/icons/icons8-facebook-новый-144.png'
import instagram from '../../assets/icons/icons8-instagram-144.png'
import youtube from '../../assets/icons/icons8-youtube-144.png'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import { useState, useEffect } from 'react'
import { getUsersByLikesDesc } from '../../firebase/firebaseHelpers/users'

export default function Footer() {
	const [users, setUsers] = useState([])
	useEffect(() => {
		const getUser = async () => {
			const response = await getUsersByLikesDesc()
			setUsers(response)
		}
		getUser()
	}, [])

	const faqLinks = [
		{ id: 'trailer-nest-question', label: 'What is TrailerNest?' },
		{ id: 'trailer-nest-dislike', label: 'How do I remove a like?' },
		{ id: 'trailer-nest-support', label: 'How do I contact support?' },
	]

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
						<p>Top 3 kings</p>
						{users.slice(0, 3).map(u => {
							return (
								<Link to={`user/${u?.uid}`} key={u.uid}>
									{u?.displayName}
								</Link>
							)
						})}
					</div>
					<div>
						<Link to='/faq'>FAQ</Link>
						{faqLinks.map(({ id, label }) => (
							<HashLink key={id} smooth to={`/faq#${id}`}>
								{label}
							</HashLink>
						))}
					</div>
				</div>
			</div>
		</footer>
	)
}
