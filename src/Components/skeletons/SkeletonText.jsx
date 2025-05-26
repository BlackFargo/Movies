import ContentLoader from 'react-content-loader'

export const SkeletonText = props => (
	<ContentLoader
		speed={1}
		width='100%'
		height={35}
		viewBox='0 0 100 35'
		preserveAspectRatio='none'
		backgroundColor='#c1bebe'
		foregroundColor='#ece9e9'
		{...props}
	>
		<rect x='0' y='0' rx='0' ry='0' width='100' height='35' />
	</ContentLoader>
)
