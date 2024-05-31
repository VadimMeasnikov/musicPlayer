import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';
import { addAlbum } from '../../reduxToolkit/slices/albumSlice';
import { addArtistData } from '../../reduxToolkit/slices/artistSlice';
import './ProfileCard.scss'

export default function ProfileCard({ data, dataAlbum }) {
	const [title, setTitle] = useState(null)
	const [src, setSrc] = useState('')
	const [status, setStatus] = useState('Artist')
	const [linkTo, setLinkTo] = useState('')
	const dispatch = useDispatch()
	const navigate = useNavigate()
	useEffect(() => {
		if (data.duration) {
			setTitle(data.name)
			setStatus(data.artist_name)
		}
		else if (dataAlbum.name == null) {
			setStatus('Artist')
			setTitle(data.name)
		}
		else {
			setStatus('Album')
			setTitle(dataAlbum.name)
		}
		if (dataAlbum.name == null) {
			setSrc(data.image)
		} else {
			setSrc(dataAlbum.tracks[0].album_image)
		}
	}, [])


	const correctNavigate = () => {
		if (status == 'Album') {
			dispatch(addAlbum({ albumData: dataAlbum, isCustomPlaylist: true }));
			navigate(`/album/${uuidv4()}`);
		}
		else if (status == 'Artist') {
			dispatch(addArtistData(data));
			navigate("/artist")
		}
		else{
			navigate(`/player/${data.id}`)
		}
	};

	return (
		<div onClick={correctNavigate} className='profile_card_container'>
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
