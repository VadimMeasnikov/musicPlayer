import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useGetArtistsQuery } from '../../reduxToolkit/queryApi/getArtists'
import { useDispatch, useSelector } from 'react-redux';
import { useEditData } from '../../services';
import { setArtists } from '../../reduxToolkit/slices/userArtistsSlice';
import { removeArtists } from '../../reduxToolkit/slices/userArtistsSlice';
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
	const [buttonShow, setButtonShow] = useState(false)

	useEffect(() => {
		if (data && data.results) {
			setArtistsServer(data.results)
		}
	}, [data])

	const handleSearch = event => {
		setSearchQuery(event.target.value)
	}

	const userArtists = useSelector(state => state.userArtists);
	const selectedArtists = useSelector(
		state => userArtists.userAppArtists
	)
	console.log(selectedArtists);



	function handleArtistSelect(artist) {
    const isArtistSelected = selectedArr.some(
        selectedArtist => selectedArtist.id === artist.id
    );

    if (isArtistSelected) {
        const updatedSelectedArr = selectedArr.filter(
            selectedArtist => selectedArtist.id !== artist.id
        );
        setSelectedArr(updatedSelectedArr);
        dispatch(removeArtists(artist.id));
    } else {
        setSelectedArr([...selectedArr, artist]);
        dispatch(setArtists(artist));
    }

    if (selectedArr.length >= 2) {
        const idKey = keyObj.key;
        editData.mutate({ id: idKey, field, updateData: JSON.stringify(selectedArr) });
        navigate('/');
    }
}

	useEffect(() => {
		console.log(selectedArr);
	}, [selectedArr])

	useEffect(() => {
		// Если количество выбранных артистов больше или равно 3, показываем кнопку
		if (selectedArtists.length >= 3) {
			setButtonShow(true)
		} else {
			setButtonShow(false)
		}
	}, [selectedArtists])

	// function handleArtistSelect(artist) {


	const filteredArtists = artistsServer.filter(artist =>
		artist.name.toLowerCase().includes(searchQuery.toLowerCase())
	)

	const handleRedirect = () => {
		if (selectedArtists.length >= 3) {
			console.log('before adding' + selectedArtists)
			console.log('user id is' + id)
			editData.mutate({ id, field, selectedArtists })
			console.log('added artists')
			navigate('/')
		} else {
			return
		}
	}

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
						<input
							type='text'
							placeholder='Search'
							value={searchQuery}
							onChange={handleSearch}
						/>
					</div>
				</div>
				<div className='card_block'>
					{filteredArtists.map(item => (
						<Artist key={item.id} item={item} onSelect={handleArtistSelect} />
					))}
				</div>
			</div>
			{buttonShow && (
				<button className='fixedButton' onClick={handleRedirect}>
					Go to Main Page
				</button>
			)}
		</div>
	)
}
