import React from 'react'
import video from '../../assets/videos/Titanik.mp4'

export default function Video() {
	return (
		<div className='video-wrapper'>
			<video controls>
				<source src={video} type='video/mp4' />
			</video>
		</div>
	)
}
