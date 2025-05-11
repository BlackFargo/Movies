import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import s from './Registration.module.scss'
import { useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import {
	loginUserAsync,
	registerUserAsync,
} from '../../store/slices/authThunks'

export default function Registration() {
	const [switchType, setSwitchType] = useState(false)
	const switchTypeRef = useRef()

	const navigate = useNavigate()
	const {
		register,
		handleSubmit,
		reset,
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
				navigate('/user')
			} else {
				console.error('Log in failed:', resultAction.payload)
			}
		} catch (error) {
			console.error('Log in error:', error)
		}

		handleReset()
	}

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
				{loading ? <div className={s.loading_round}></div> : ''}

				{switchType ? (
					''
				) : (
					<input
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
				<input
					type='email'
					{...register('email', { required: 'Email is required' })}
					className={s.input}
					placeholder='Email'
					name='email'
					disabled={loading}
				/>
				{errors.email && <p className={s.error}>{errors.email.message}</p>}

				<input
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

				<div>
					{errorMessage && <div className={s.error}>Email-already-in-use</div>}
				</div>
			</form>
		</div>
	)
}
