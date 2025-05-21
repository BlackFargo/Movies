import { deleteUser, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/firebaseConfing'

let verificationTimeout

export const deleteUserIfNotVerified = () => {
	onAuthStateChanged(auth, user => {
		if (verificationTimeout) clearTimeout(verificationTimeout)

		if (user) {
			if (user.emailVerified) return

			const createdAt = new Date(user.metadata.creationTime).getTime()
			const now = Date.now()

			const ageMs = now - createdAt
			const lifespan = 1 * 60 * 1000
			const remaining = lifespan - ageMs

			if (remaining <= 0) {
				deleteUser(user)
					.then(() => console.log(`User has bene deleted`))
					.catch(e => console.error(`Error deleting user`, e))
			} else {
				verificationTimeout = setTimeout(async () => {
					try {
						deleteUser(user)
						console.log(`User was deleted on timeout`)
					} catch (e) {
						console.error(e)
					}
				}, remaining)
			}
			console.log(
				`Запланировано удаление через ${Math.round(remaining / 1000)} с`
			)
		}
	})
}
