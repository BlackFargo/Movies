export const checkRank = likes => {
	switch (true) {
		case likes >= 500:
			return { name: 'Cinematic Conqueror', emoji: '👑' }
		case likes >= 250:
			return { name: 'Blockbuster Boss', emoji: '🏆' }
		case likes >= 100:
			return { name: 'Scene Stealer', emoji: '⭐️' }
		case likes >= 50:
			return { name: 'Reel Fanatic', emoji: '🎬' }
		case likes >= 10:
			return { name: 'Trailer Trooper', emoji: '🎥' }
		default:
			return { name: 'Popcorn Rookie', emoji: '🍿' }
	}
}
