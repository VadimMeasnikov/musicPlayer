import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useGetArtistsQuery } from '../../reduxToolkit/queryApi/getArtists'
import { useDispatch, useSelector } from 'react-redux';
import { useEditData } from '../../services';
import { setArtists } from '../../reduxToolkit/slices/userArtistsSlice';

import Artist from '../../Components/Artist/Artist'
import backButtonSVG from '../../img/Back.svg'

import './artists.scss'



export default function Artists() {

	const [artistsServer, setArtistsServer] = useState([])
	const [selectedArr, setSelectedArr] = useState([])
	const [searchQuery, setSearchQuery] = useState('')
	const { data } = useGetArtistsQuery()
	const dispatch = useDispatch();
	const navigate = useNavigate();
	// const userStr = JSON.stringify(useSelector((state) => state.user))
	// console.log(userStr);
	// const user = JSON.parse(userStr)
	const keyObj = useSelector((state) => state.userKey)
	console.log('key is ' + keyObj.key);
	const idKey = keyObj.key
	const field = 'artists'
	console.log(field);
	console.log(idKey);

	const editData = useEditData()


	const artistArr = JSON.stringify([
		{ artist: 'artist_1' },
		{ artist: 'artist_2' },
		{ artist: 'artist_3' }
	]);
	// const artistArr = JSON.parse(artistArrStr)
	// console.log(artistArr);

	useEffect(() => {
		if (data && data.results) {
			setArtistsServer(data.results)
		}
	}, [data])

	const handleSearch = event => {
		setSearchQuery(event.target.value)
	}
	const  userArtists = useSelector(state => state.userArtists);
	console.log(userArtists.userAppArtists);
	// console.log(selectedArtists);



	function handleArtistSelect(artist) {
		dispatch(setArtists(artist));
		setSelectedArr([...selectedArr, artist])
		console.log('Selected artist:', artist);
		console.log( userArtists.userAppArtists.length);
		if ( userArtists.userAppArtists.length >= 2) {
			const idKey = keyObj.key
			console.log(JSON.parse(artistArr));
			editData.mutate({id: idKey, field, updateData: JSON.stringify(userArtists.userAppArtists)})

			console.log('added artists');
			navigate('/')
		}
	}

	const filteredArtists = artistsServer.filter(artist =>
		artist.name.toLowerCase().includes(searchQuery.toLowerCase())
	)

	return (
		<div>
			<div className='artists_container'>
				<div className='top_block'>
					<button className='back_btn'>
						<img src={backButtonSVG} alt='Back' />
					</button>
					<div className='text_block'>
						<p className='choose_artists'>Choose 3 or more artists you like.</p>
					</div>
				</div>
				<div className='input_block'>
					<div className='searchInput'>
						<span></span>
						<input type='text' placeholder="Search" value={searchQuery} onChange={handleSearch} />
					</div>
				</div>
				<div className='card_block'>
					{filteredArtists.map(item => (
						<Artist key={item.id} item={item} onSelect={handleArtistSelect} />
					))}
				</div>
			</div>
		</div>
	)
}