import { Link } from 'react-router-dom'
import logo from '../../assets/icons/pngwing.com.png'
import heart from '../../assets/icons/icons8-червы-100.png'
import { useSelector } from 'react-redux'
import { useModal } from '../../hooks/UseModal'

export default function Header() {
	const { isOpen, setIsOpen, toggle } = useModal()
	const userState = useSelector(state => state.auth.user)
	const likesCount = useSelector(state => state.likes.likesCount)

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
				<Link to={'/'}>Home</Link>
				<Link to={'/favorites'}>Favorites</Link>
				<a href='#categoryes'>Movies</a>
				<a href='#categoryes'>FAQ</a>
				<a href='#categoryes'>Help</a>
			</ul>
			<div className='header__auth-flex'>
				<div className='favorites__movies'>
					<Link to={'/user'} className='favorites__movies__link'>
						<img src={heart} alt='' />
						<p>{(likesCount && likesCount) || 0}</p>
					</Link>
				</div>
				{userState ? (
					<Link to={'/user'} className='login login_link'>
						<img src='https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png' />
						{userState.displayName}
					</Link>
				) : (
					<Link to={'/sign-in'}>Log in</Link>
				)}
			</div>
		</header>
	)
}
