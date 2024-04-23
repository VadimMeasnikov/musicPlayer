import React, { useState, useEffect } from 'react'
import './ProfileCard.scss'
import { get } from 'firebase/database'

export default function ProfileCard({ data, dataAlbum }) {

	const [albumSrc, setAlbumSrc] = useState(null) //state для src с сервера
	const [isAlbumSrc, setIsAlbumSrc] = useState(false) //проверка, существует ли src вообще
	const [title, setTitle] = useState(null) //Имя альбома
	const [src, setSrc] = useState('')
	const [status, setStatus] = useState('Artist')

	// const { image, artist_name } = data

	// console.log(data.tracks.image);
 
	useEffect(() => {
      if(dataAlbum.name == null){
		setStatus('Artist')
		setTitle(data.name)
	  } else {
		setStatus('Album')
		setTitle(dataAlbum.name)
	  }

	  console.log(dataAlbum);
	  console.log(data);

	  if(dataAlbum.name == null){
		setSrc(data.image)
		console.log(data.image);
	  } else {
		console.log(2);
         setSrc(dataAlbum.tracks.image)
	  }
	}, [])

	// async function getImg() {
	// 	const albumImg = await dataAlbum.tracks.image
	// 	console.log(albumImg);

	// 	if(!albumImg){
    //        setSrc(data.image)
	// 	}

	// 	const title = dataAlbum.name
	// 	setTitle(title)
	// 	return albumImg
	// }
	// getImg().then(albumImg => {
	// 	console.log(albumImg);
	// 	console.log('mySrc is ' + albumImg);
	// 	setAlbumSrc(albumImg)

	// 	if (albumSrc) {
	// 		setIsAlbumSrc(true)
	// 	} else {
	// 		setIsAlbumSrc(false)
	// 	}
	// });

	// getImg()

	// const albumImg = data.tracks.image
	const content = 'Artist'
	return (
		<div className='profile_card_container'>
			<div className='profile_card'>
				{/* {isAlbumSrc !== true ? (
					<img src={image} className='card_image' />
				) : (
					<img src={albumSrc} className='card_image' />
				)} */}
				<img src={src} className='card_image' />
				<div className='text_block'>
					<p className='card_artist'>{title}</p>
					<p className='card_content'>{status}</p>
				</div>
			</div>
		</div>
	)
}
