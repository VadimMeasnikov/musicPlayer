import React, { useState, useEffect } from 'react'
import './ProfileCard.scss'

export default function ProfileCard({ data, dataAlbum }) {
	const [title, setTitle] = useState(null) //Имя альбома
	const [src, setSrc] = useState('')
	const [status, setStatus] = useState('Artist')

	useEffect(() => {
		if (dataAlbum.name == null) {
			setStatus('Artist')
			setTitle(data.name)
		} else {
			setStatus('Album')
			setTitle(dataAlbum.name)
		}
		if (dataAlbum.name == null) {
			setSrc(data.image)
		} else {
			setSrc(dataAlbum.tracks[0].album_image)
		}
	}, [])

	const content = 'Artist'
	return (
		<div className='profile_card_container'>
			<div className='profile_card'>
				<img src={src} className='card_image' />
				<div className='text_block'>
					<p className='card_artist'>{title}</p>
					<p className='card_content'>{status}</p>
				</div>
			</div>
		</div>
	)
}
