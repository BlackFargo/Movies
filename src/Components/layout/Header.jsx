import { Link } from 'react-router-dom'
import logo from '../../assets/icons/pngwing.com.png'
import heart from '../../assets/icons/icons8-червы-100.png'
import { logoutUserAsync } from '../../store/slices/authThunks'

import { useDispatch, useSelector } from 'react-redux'
import { auth } from '../../firebase/firebaseConfing'

export default function Header() {
	const userState = useSelector(state => state.auth.user)
	const dispatch = useDispatch()

	return (
		<header>
			<Link className='header__logo-flex' to={'/'}>
				<img src={logo} alt='logo' />
				<div className='header__logo-flex_sitename'>
					<p>REACT</p>
					<p>CINEMA</p>
				</div>
			</Link>
			<ul className='header__navbar-flex'>
				<Link to={'/'}>Home</Link>
				<Link to={'/favorites'}>Favorites</Link>
				<a href='#categoryes'>Movies</a>
				<a href='#categoryes'>FAQ</a>
				<a href='#categoryes'>Help</a>
			</ul>
			<div className='header__auth-flex'>
				<div className='favorites__movies'>
					<img src={heart} alt='' />
					<p>0</p>
				</div>
				{userState ? (
					<Link to={'/user'} className='login login_link'>
						<img src='https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png' />
						{userState.displayName}
					</Link>
				) : (
					<Link to={'/sign-in'}>Log in</Link>
				)}
				<div
					style={{ color: 'white' }}
					onClick={() => dispatch(logoutUserAsync())}
				>
					Sign out
				</div>
			</div>
		</header>
	)
}
