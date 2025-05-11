import starImage from '../../assets/icons/star.png'

export default function Rating({ rating }) {
	const stars = []
	const validRating = rating ? Math.round(rating / 2) : 0
	for (let i = 1; i <= validRating; i++) {
		stars.push(i)
	}

	return (
		<>
			{stars.length
				? stars.map((star, index) => {
						return <img src={starImage} alt='star icon' key={index} />
				  })
				: 'No rating'}
		</>
	)
}
