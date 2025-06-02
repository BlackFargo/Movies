import { useSelector } from 'react-redux'
import { Route, Routes, useLocation, Navigate } from 'react-router-dom'
import { publicRoutes, privateRoutes } from './routes'
import { NotFound } from './pages/NotFound'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { useRef } from 'react'

// ваш компонент-прокладка для приватных роутов
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
				<div ref={nodeRef}>
					<Routes location={location}>
						{publicRoutes.map(route => {
							const { path, component: Component } = route
							return <Route key={path} path={path} element={<Component />} />
						})}

						{privateRoutes.map(route => {
							const { path, component: Component } = route
							return (
								<Route
									key={path}
									path={path}
									element={
										<PrivateRoute>
											<Component />
										</PrivateRoute>
									}
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
