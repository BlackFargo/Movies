import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import s from './Admin.module.scss'
import { getUsers, updateRole } from '../../firebase/firebaseFunctions'
import { Input } from '../../ui/input/Input'

const VERIFY_URL =
	'https://us-central1-movies-ea8b8.cloudfunctions.net/verifyAdminPass'

const DELETE_USER_URL =
	'https://us-central1-movies-ea8b8.cloudfunctions.net/deleteUser'

export function Admin() {
	const authUser = useSelector(state => state.auth.user)
	const navigate = useNavigate()

	useEffect(() => {
		if (authUser?.role !== 'Founder') {
			navigate('/')
		}
	}, [authUser, navigate])

	const [password, setPassword] = useState('')
	const [isAuthorized, setIsAuthorized] = useState(false)
	const [passError, setPassError] = useState(null)
	const [verifying, setVerifying] = useState(false)

	const [users, setUsers] = useState([])
	const [roleInputs, setRoleInputs] = useState({})
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	// Функция проверки пароля
	const handleVerify = async e => {
		e.preventDefault()
		setPassError(null)
		setVerifying(true)
		try {
			const res = await fetch(VERIFY_URL, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ password }),
			})
			const data = await res.json()
			if (data.ok) {
				setIsAuthorized(true)
			} else {
				setPassError(data.error || 'Wrong password')
			}
		} catch (e) {
			console.error(e)
			setPassError('Network error')
		} finally {
			setVerifying(false)
		}
	}

	useEffect(() => {
		if (!isAuthorized) return
		setLoading(true)
		getUsers()
			.then(list =>
				setUsers(
					list.map(u => ({
						...u,
						isEditing: false,
					}))
				)
			)
			.catch(e => {
				console.error(e)
				setError('Failed to load users')
			})
			.finally(() => setLoading(false))
	}, [isAuthorized])

	const handleInputChange = (uid, value) => {
		setRoleInputs(prev => ({ ...prev, [uid]: value }))
	}

	const handleButtonClick = async user => {
		const { uid, isEditing } = user
		if (isEditing) {
			const newRole = (roleInputs[uid] || '').trim()
			if (!newRole) return
			try {
				await updateRole(uid, newRole)
				setUsers(prev =>
					prev.map(u =>
						u.uid === uid ? { ...u, role: newRole, isEditing: false } : u
					)
				)
				setRoleInputs(prev => ({ ...prev, [uid]: '' }))
			} catch (e) {
				console.error('Failed to update role', e)
			}
		} else {
			setUsers(prev =>
				prev.map(u => (u.uid === uid ? { ...u, isEditing: true } : u))
			)
			setRoleInputs(prev => ({ ...prev, [uid]: user.role }))
		}
	}

	// Новая функция: удаление пользователя
	const handleDeleteUser = async uid => {
		if (!window.confirm('Вы точно хотите удалить этого пользователя?')) return

		try {
			const res = await fetch(DELETE_USER_URL, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ password, uidToDelete: uid }),
			})
			const data = await res.json()
			if (res.ok && data.success) {
				// Удаляем из локального стейта
				setUsers(prev => prev.filter(u => u.uid !== uid))
			} else {
				const errMsg = data.error || 'Failed to delete user'
				alert(errMsg)
			}
		} catch (e) {
			console.error('Network error:', e)
			alert('Network error while deleting user')
		}
	}

	if (!isAuthorized) {
		return (
			<section className={s.admin}>
				<form onSubmit={handleVerify} className={s.admin_auth_form}>
					<label htmlFor='pass'> </label>
					Enter admin password:{' '}
					<Input
						id='pass'
						type='password'
						value={password}
						onChange={e => setPassword(e.target.value)}
						disabled={verifying}
					/>
					<button type='submit' disabled={verifying || !password}>
						{verifying ? 'Verifying…' : 'Verify'}
					</button>
					{passError && <p className={s.error}>{passError}</p>}
				</form>
			</section>
		)
	}

	if (loading) return <p className={s.admin}>Loading users...</p>
	if (error) return <p className={s.admin}>{error}</p>

	return (
		<section className={s.admin}>
			<table className={s.admin_user_table}>
				<thead>
					<tr>
						<th>UID</th>
						<th>Email</th>
						<th>Role</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{users.map(user => (
						<tr key={user.uid}>
							<td>{user.uid}</td>
							<td>{user.email}</td>
							<td className={s.role_td}>
								{user.isEditing ? (
									<>
										<input
											type='text'
											value={roleInputs[user.uid] || ''}
											onChange={e =>
												handleInputChange(user.uid, e.target.value)
											}
										/>
										<button onClick={() => handleButtonClick(user)}>
											Save
										</button>
									</>
								) : (
									<>
										<span>{user.role}</span>
										<button onClick={() => handleButtonClick(user)}>
											Edit
										</button>
									</>
								)}
							</td>
							<td>
								<button
									className={s.delete_button}
									onClick={() => handleDeleteUser(user.uid)}
								>
									Delete
								</button>
							</td>
						</tr>
					))}
					{users.length === 0 && (
						<tr>
							<td colSpan={4} style={{ textAlign: 'center', padding: '16px' }}>
								No users found
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</section>
	)
}
