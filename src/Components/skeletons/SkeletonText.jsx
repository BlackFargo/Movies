import ContentLoader from 'react-content-loader'

export const SkeletonText = props => (
	<ContentLoader
		speed={1}
		width={300}
		height={30}
		viewBox='0 0 300 30'
		backgroundColor='#c1bebe'
		foregroundColor='#ece9e9'
		{...props}
	>
		<rect x='0' y='0' rx='10' ry='10' width='300' height='30' />
	</ContentLoader>
)
