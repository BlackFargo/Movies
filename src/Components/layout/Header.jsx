import { Link } from 'react-router-dom'
import logo from '../../assets/icons/pngwing.com.png'
import heart from '../../assets/icons/icons8-червы-100.png'
import { useSelector } from 'react-redux'
import { useModal } from '../../hooks/UseModal'
import { useEffect, useState } from 'react'
import { auth } from '../../firebase/firebaseConfing'
import { getRank } from '../../firebase/firebaseFunctions'
export default function Header() {
	const [currentRank, setCurrentRank] = useState('')
	const [likesCount, setLikesCount] = useState(0)
	const { isOpen, toggle } = useModal()
	const userState = useSelector(state => state.auth.user)
	const likesCountState = useSelector(state => state.likes.likesCount)

	useEffect(() => {
		const fetchRank = async () => {
			try {
				const rank = await getRank(auth?.currentUser?.uid)
				setCurrentRank(rank)
			} catch (error) {
				console.error('Error in fetchRank:', error)
			}
		}

		if (auth?.currentUser?.uid) {
			fetchRank()
		}
	}, [auth.currentUser])

	return (
		<header>
			<button
				className='header-burger-btn'
				onClick={toggle}
				aria-label={isOpen ? 'Close menu' : 'Open menu'}
				aria-expanded={isOpen}
				type='button'
			>
				<span
					className={`header-burger-line ${isOpen ? 'active-burger' : ''}`}
					aria-hidden='true'
				></span>
				<span
					className={`header-burger-line ${isOpen ? 'active-burger' : ''}`}
					aria-hidden='true'
				></span>
				<span
					className={`header-burger-line ${isOpen ? 'active-burger' : ''}`}
					aria-hidden='true'
				></span>
			</button>
			<Link className='header__logo-flex' to={'/'}>
				<img src={logo} alt='logo' />
				<div className='header__logo-flex_sitename'>
					<p>REACT</p>
					<p>CINEMA</p>
				</div>
			</Link>
			<ul className={`header__navbar-flex ${isOpen ? 'active-navbar' : ''}`}>
				<Link to={'/'}>Movies</Link>
				<Link to={'/favorites'}>Favorites</Link>
				<Link to={'/ranks'}>Rank system</Link>
				<Link to={'/faq'}>FAQ</Link>
				<Link to={'/support'}>Support</Link>
			</ul>
			<div className='header__auth-flex'>
				<div className='favorites__movies'>
					<Link to={'/favorites'} className='favorites__movies__link'>
						<img src={heart} alt='' />
						<p>{(likesCount && likesCount) || 0}</p>
					</Link>
				</div>
				{userState ? (
					<Link to={'/user'} className='login login_link'>
						<img src='https://s.yimg.com/ny/api/res/1.2/Q.ZSt87BOpN7F.3ImzY37Q--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MDtoPTk2MA--/https://media.zenfs.com/en/woman_s_world_418/3ed63fb14fabf7ef2a5bd84b3c6c2a38' />
						{userState.displayName} {currentRank?.emoji}
					</Link>
				) : (
					<Link to={'/sign-in'}>Log in</Link>
				)}
			</div>
		</header>
	)
}
