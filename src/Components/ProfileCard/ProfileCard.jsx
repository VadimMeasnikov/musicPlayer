import React, { useState } from 'react'
import './ProfileCard.scss'

export default function ProfileCard({ data }) {
	console.log(data);
	const { image, artist_name } = data
	console.log(data.tracks.image);
	async function getImg(){
		const albumImg = await data.tracks.image
		console.log(albumImg);
		return albumImg
	}
	const mySrc = getImg()
	console.log('mySrc is ' + mySrc);
	// const albumImg = data.tracks.image
	const content = 'Artist'
	return (
		<div className='profile_card_container'>
			<div className='profile_card'>
				{/* <img src={mySrc} className='card_image' alt="" /> */}
				<img src={getImg()} className='card_image' />
				<div className='text_block'>
					<p className='card_artist'>{artist_name} {data.name}</p>
					<p className='card_content'>{content}</p>
				</div>
			</div>
		</div>
	)
}
