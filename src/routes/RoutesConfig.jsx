import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes, useLocation, Navigate } from 'react-router-dom'
import { publicRoutes, privateRoutes } from './routes'
import { NotFound } from '../pages/NotFound'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

function PrivateRoute({ children }) {
	const authState = useSelector(state => state.auth)
	return authState.user?.uid ? children : <Navigate to='/sign-in' replace />
}

export function RoutesConfig() {
	const location = useLocation()
	const nodeRef = useRef(null)

	return (
		<TransitionGroup component={null}>
			<CSSTransition
				key={location.key}
				nodeRef={nodeRef}
				classNames='fade'
				timeout={300}
				exit={false}
			>
				<div ref={nodeRef} className='main_container'>
					<Routes location={location}>
						{publicRoutes.map(route => {
							const { path, element } = route
							return <Route key={path} path={path} element={element} />
						})}

						{privateRoutes.map(route => {
							const { path, element } = route
							return (
								<Route
									key={path}
									path={path}
									element={<PrivateRoute>{element}</PrivateRoute>}
								/>
							)
						})}

						<Route path='*' element={<NotFound />} />
					</Routes>
				</div>
			</CSSTransition>
		</TransitionGroup>
	)
}
