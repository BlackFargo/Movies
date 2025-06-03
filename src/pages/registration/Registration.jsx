import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import s from './Registration.module.scss'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
	loginUserAsync,
	registerUserAsync,
} from '../../store/slices/auth/authThunks'
import { Input } from '../../ui/input/Input'
import {
	resetPasswordByEmail,
	signInWithGoogle,
} from '../../firebase/firebaseFunctions'
import { auth } from '../../firebase/firebaseConfing'

export function Registration() {
	const [switchType, setSwitchType] = useState(false)
	const [resetPasswordStatus, setResetPasswordStatus] = useState('')
	const authError = useSelector(state => state.auth.error)

	const switchTypeRef = useRef()

	const navigate = useNavigate()
	const {
		register,
		handleSubmit,
		reset,
		watch,
		formState: { errors },
	} = useForm({
		defaultValues: {},
	})

	const state = useSelector(state => state.auth)
	const dispatch = useDispatch()

	const loading = useSelector(state => state.auth?.loading)
	const errorMessage = useSelector(state => state.auth?.error)

	useEffect(() => {
		console.log(state)
	}, [state])

	const handleReset = () => {
		reset({
			email: '',
			password: '',
		})
	}
	const signUpSubmit = async data => {
		try {
			const resultAction = await dispatch(
				registerUserAsync({
					email: data.email,
					password: data.password,
					nickname: data.nickname,
				})
			)

			if (registerUserAsync.fulfilled.match(resultAction)) {
				navigate('/user')
			} else {
				console.error('Registration failed:', resultAction.payload)
			}
		} catch (error) {
			console.error('Registration error:', error)
		}

		handleReset()
	}

	const logInSubmit = async data => {
		try {
			const resultAction = await dispatch(
				loginUserAsync({
					email: data.email,
					password: data.password,
				})
			)

			if (loginUserAsync.fulfilled.match(resultAction)) {
				navigate(`/user/${auth?.currentUser?.uid}`)
			} else {
				console.error('Log in failed:', resultAction.payload)
			}
		} catch (error) {
			console.error('Log in error:', error)
		}

		handleReset()
	}

	const resetPasswordHandler = async () => {
		const response = await resetPasswordByEmail(currentEmail)
		console.log(response)
		setResetPasswordStatus(response)
	}

	const currentEmail = watch('email')

	return (
		<div className={s.register_container}>
			<form
				onSubmit={handleSubmit(switchType ? logInSubmit : signUpSubmit)}
				className={s.form}
			>
				<input
					type='checkbox'
					id='switch_register_type'
					className={s.form_switch_type_checkbox}
					ref={switchTypeRef}
					onChange={() => setSwitchType(switchTypeRef.current.checked)}
				/>
				<label
					htmlFor='switch_register_type'
					className={s.form_switch_type_label}
				></label>
				<button
					type='button'
					className={s.form_google_login}
					onClick={signInWithGoogle}
				>
					<div className={s.form_google_login_icon}>
						<svg
							width='30px'
							height='30px'
							viewBox='-3 0 262 262'
							xmlns='http://www.w3.org/2000/svg'
							preserveAspectRatio='xMidYMid'
						>
							<path
								d='M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027'
								fill='#4285F4'
							/>
							<path
								d='M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1'
								fill='#34A853'
							/>
							<path
								d='M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782'
								fill='#FBBC05'
							/>
							<path
								d='M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251'
								fill='#EB4335'
							/>
						</svg>
					</div>
				</button>
				{loading ? <div className={s.loading_round}></div> : ''}

				{switchType ? (
					''
				) : (
					<Input
						type='text'
						{...register('nickname', { required: 'Nickname is required' })}
						className={s.input}
						placeholder='Nickname'
						name='nickname'
						disabled={loading}
					/>
				)}

				{errors.nickname && (
					<p className={s.error}>{errors.nickname.message}</p>
				)}
				<Input
					type='email'
					{...register('email', { required: 'Email is required' })}
					className={s.input}
					placeholder='Email'
					name='email'
					disabled={loading}
				/>
				{errors.email && <p className={s.error}>{errors.email.message}</p>}

				<Input
					type='password'
					{...register('password', { required: 'Password is required' })}
					className={s.input}
					placeholder='Password'
					name='password'
					disabled={loading}
				/>
				{errors.password && (
					<p className={s.error}>{errors.password.message}</p>
				)}

				{!switchType && (
					<label className={s.privacy_label}>
						<input
							type='checkbox'
							name='consent'
							disabled={loading}
							{...register('consent', { required: 'Consent required' })}
						/>
						{errors.consent && (
							<p className={s.error}>{errors.consent.message}</p>
						)}
						<p>
							I have read and agree to the processing of my personal data in
							accordance with the{' '}
							<Link to={'/privacy-policy'}>Privacy Policy</Link>.
						</p>
					</label>
				)}
				{switchType && (
					<>
						<p onClick={resetPasswordHandler} className={s.reset_password}>
							Reset password
						</p>
						<p>
							{resetPasswordStatus.success === true
								? 'The request has been sent to your email'
								: resetPasswordStatus.message}
						</p>
					</>
				)}

				<button
					type='button'
					onClick={handleReset}
					className={s.button}
					disabled={loading}
				>
					Clear Form
				</button>

				<button type='submit' className={s.button} disabled={loading}>
					<p
						key={switchType ? 'login' : 'signup'}
						className={s.switch_type_text}
					>
						{switchType ? 'Log in' : 'Sign up'}
					</p>
				</button>

				<div>{errorMessage && <div className={s.error}>{authError}</div>}</div>
			</form>
		</div>
	)
}
