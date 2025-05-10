import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import s from './Registration.module.scss'
import { useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import {
	logoutUserAsync,
	registerUserAsync,
} from '../../store/slices/authThunks'

export default function Registration() {
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
	const submit = async data => {
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
	return (
		<div className={s.register_container}>
			<form onSubmit={handleSubmit(submit)} className={s.form}>
				<h1>Sign up</h1>
				<input
					type='text'
					{...register('nickname', { required: 'Nickname is required' })}
					className={s.input}
					placeholder='nickname'
					name='nickname'
					disabled={loading}
				/>
				{errors.nickname && (
					<p className={s.error}>{errors.nickname.message}</p>
				)}
				<input
					type='email'
					{...register('email', { required: 'Email is required' })}
					className={s.input}
					placeholder='email'
					name='email'
					disabled={loading}
				/>
				{errors.email && <p className={s.error}>{errors.email.message}</p>}

				<input
					type='password'
					{...register('password', { required: 'Password is required' })}
					className={s.input}
					placeholder='password'
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
					Sign up
				</button>

				<div>
					{errorMessage && <div className={s.error}>Email-already-in-use</div>}
				</div>
			</form>
		</div>
	)
}
