import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetArtistsQuery } from '../../reduxToolkit/queryApi/getArtists'
import { useDispatch, useSelector } from 'react-redux'
import { useEditData } from '../../services'
import {
	selectArtist,
	removeArtist,
} from '../../reduxToolkit/slices/selectedArtistsSlice'
import Artist from '../../Components/Artist/Artist'
import backButtonSVG from '../../img/Back.svg'
import './artists.scss'

export default function Artists() {
	const [artists, setArtists] = useState([])
	const [selectedArr, setSelectedArr] = useState([])
	const [searchQuery, setSearchQuery] = useState('')
	const { data } = useGetArtistsQuery()
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const user = useSelector(state => state.user)
	const id = user.id
	const field = 'artists'
	const editData = useEditData()
	const [buttonShow, setButtonShow] = useState(false)

	useEffect(() => {
		if (data && data.results) {
			setArtists(data.results)
		}
	}, [data])

	const handleSearch = event => {
		setSearchQuery(event.target.value)
	}

	const selectedArtists = useSelector(
		state => state.selectedArtists.selectedArtists
	)

	function handleArtistSelect(artist) {
		const isArtistSelected = selectedArr.some(
			selectedArtist => selectedArtist.id === artist.id
		)

		if (isArtistSelected) {
			const updatedSelectedArr = selectedArr.filter(
				selectedArtist => selectedArtist.id !== artist.id
			)
			setSelectedArr(updatedSelectedArr)

			dispatch(removeArtist(artist.id))
			return
		}

		dispatch(selectArtist(artist))
		setSelectedArr([...selectedArr, artist])
	}

	useEffect(() => {
		// Если количество выбранных артистов больше или равно 3, показываем кнопку
		if (selectedArtists.length >= 3) {
			setButtonShow(true)
		} else {
			setButtonShow(false)
		}
	}, [selectedArtists])

	const filteredArtists = artists.filter(artist =>
		artist.name.toLowerCase().includes(searchQuery.toLowerCase())
	)

	const handleRedirect = () => {
		if (selectedArtists.length  >= 3) {
			console.log('before adding' + selectedArtists)
			console.log('user id is' + id)
			editData.mutate({ id, field, selectedArtists })
			console.log('added artists')
			navigate('/')
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
