const checkRank = likes => {
	switch (likes) {
		case likes >= 10:
			return { name: 'Trailer Trooper', emoji: '🎥' }
			break
		case likes >= 50:
			return { name: 'Reel Fanatic', emoji: '🎬' }
			break
		case likes >= 100:
			return { name: 'Scene Stealer', emoji: '⭐️' }
			break
		case likes >= 250:
			return { name: 'Blockbuster Boss', emoji: '🏆' }
			break
		case likes >= 500:
			return { name: 'Cinematic Conqueror', emoji: '👑' }
			break
	}
}
