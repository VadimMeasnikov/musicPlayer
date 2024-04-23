import React from 'react'
import './ProfileCard.scss'

export default function ProfileCard({data}) {
	console.log(data);
	const {image, artist_name} = data
	const [currentImage, setCurrentImage]
	const albumImg = data.image
	const content = 'Artist'
	if(image == 'undefind'){

	}
	return (
		<div className='profile_card_container'>
			<div className='profile_card'>
				<img src={image} className='card_image' />
				<div className='text_block'>
					<p className='card_artist'>{artist_name} {data.name}</p>
					<p className='card_content'>{content}</p>
				</div>
			</div>
		</div>
	)
}
