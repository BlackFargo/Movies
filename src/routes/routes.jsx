import { Home } from '../pages/Home'
import { Favorites } from '../pages/Favorites'
import { Movie } from '../pages/Movie'
import { Registration } from '../pages/registration/Registration'
import { UserPage } from '../pages/userPage/UserPage'
import { Faq } from '../pages/faq/Faq'
import { Support } from '../pages/Support/Support'
import { Ranks } from '../pages/ranks/Ranks'
import { Admin } from '../pages/admin/Admin'

export const publicRoutes = [
	{ path: '/', element: <Home /> },
	{ path: '/favorites', element: <Favorites /> },
	{ path: '/movie', element: <Movie /> },
	{ path: '/movie/:movieName', element: <Movie /> },
	{ path: '/sign-in', element: <Registration /> },
	{ path: '/faq', element: <Faq /> },
	{ path: '/privacy-policy', element: <Support /> },
	{ path: '/ranks', element: <Ranks /> },
	{ path: '/user/:uid', element: <UserPage /> },
]

export const privateRoutes = [{ path: '/admin', element: <Admin /> }]
