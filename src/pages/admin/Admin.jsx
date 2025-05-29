import s from './Admin.module.scss'
import { getUsers } from '../../firebase/firebaseFunctions'
import { useEffect, useState } from 'react'
import { updateRole } from '../../firebase/firebaseFunctions'
export function Admin() {
	const [users, setUsers] = useState([])
	const [newRole, setNewRole] = useState('')

	useEffect(() => {
		getUsers().then(users => setUsers(users))
	}, [])

	const updateRoleHandler = async (uid, newRole) => {
		if (newRole.length === 0) return
		updateRole(uid, newRole)
		setNewRole('')
	}

	return (
		<section className={s.admin}>
			<table className={s.admin_user_table}>
				<thead>
					<tr className={s.admin_user_table_firstLine}>
						<th>UID</th>
						<th>Email</th>
						<th>Role</th>
					</tr>
				</thead>
				<tbody>
					{users.length &&
						users.map(user => {
							return (
								<tr>
									<td>{user.uid}</td>
									<td>{user.email}</td>
									<td className={s.role_td}>
										{user.role}
										<input
											type='text'
											placeholder='new role'
											value={newRole}
											onChange={e => setNewRole(e.target.value)}
										/>
										<button
											className={s.changeRole}
											onClick={() => updateRole(user?.uid, newRole)}
										>
											Change role
										</button>
									</td>
								</tr>
							)
						})}
				</tbody>
			</table>
		</section>
	)
}
