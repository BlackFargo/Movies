import ContentLoader from 'react-content-loader'

export const SkeletonRatingUsers = props => (
	<ContentLoader
		speed={1}
		width='100%'
		height={50}
		viewBox='0 0 100 50'
		preserveAspectRatio='none'
		backgroundColor='#707070'
		foregroundColor='#c2c2c2'
		{...props}
	>
		<rect x='0' y='0' rx='0' ry='0' width='100' height='50' />
	</ContentLoader>
)
