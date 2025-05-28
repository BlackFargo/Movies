import s from './Ranks.module.scss'
import { getUsersByLikesDesc } from '../../firebase/firebaseFunctions'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const likeRanks = [
	{ name: 'Popcorn Rookie', minLikes: 0, emoji: '🍿' },
	{ name: 'Trailer Trooper', minLikes: 10, emoji: '🎥' },
	{ name: 'Reel Fanatic', minLikes: 50, emoji: '🎬' },
	{ name: 'Scene Stealer', minLikes: 100, emoji: '⭐️' },
	{ name: 'Blockbuster Boss', minLikes: 200, emoji: '🏆' },
	{ name: 'Cinematic Conqueror', minLikes: 500, emoji: '👑' },
]

export default function Ranks() {
	const [users, setUsers] = useState([])
	useEffect(() => {
		const getUser = async () => {
			const response = await getUsersByLikesDesc()
			setUsers(response)
		}
		getUser()
	}, [])

	return (
		<section className={s.container}>
			<div className={s.header}>
				<h1 className={s.headerTitle}>
					Our site features a dynamic rank system that rewards your activity
				</h1>
				<p className={s.headerDescription}>
					The more likes you give, the higher your rank becomes. Each rank—from
					“Popcorn Rookie” to “Cinematic Conqueror”—is displayed on your
					profile, so other users can look you up, see your current level, and
					celebrate your movie passion. Start liking today and climb the
					leaderboard!
				</p>
			</div>

			<div className={s.rankList}>
				{likeRanks.map(rank => (
					<div key={rank.name} className={s.rankCard}>
						<span className={s.rankEmoji}>{rank.emoji}</span>
						<div className={s.rankInfo}>
							<h3 className={s.rankName}>{rank.name}</h3>
							<p className={s.rankMinLikes}>{rank.minLikes}+ likes</p>
						</div>
					</div>
				))}
			</div>

			<div className={s.leaderboard}>
				<h2 className={s.leaderboard_title}>Champions leaderboard</h2>
				<ul className={s.leaderboard_list}>
					{users.length
						? users.map((user, index) => (
								<li key={user.id}>
									#{index + 1} <span>{user.rank.emoji}</span>
									<Link to={`/user/${user?.uid}`}>
										{user.displayName} — {user.moviesCount} likes
									</Link>
								</li>
						  ))
						: null}
				</ul>
			</div>
		</section>
	)
}
