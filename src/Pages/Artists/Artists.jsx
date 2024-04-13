import React, { useEffect, useState } from 'react'
import Artist from '../../Components/Artist/Artist'
import './artists.scss'
import backButtonSVG from '../../img/Back.svg'
import { useGetArtistsQuery } from '../../reduxToolkit/queryApi/getArtists'

export default function Artists() {
	const [artists, setArtists] = useState([])
	const [searchQuery, setSearchQuery] = useState('')
	const { data } = useGetArtistsQuery()

	useEffect(() => {
		if (data && data.results) {
			setArtists(data.results)
		}
	}, [data])

	const handleSearch = event => {
		setSearchQuery(event.target.value)
	}

	const filteredArtists = artists.filter(artist =>
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
						<Artist key={item.id} item={item} />
					))}
				</div>
			</div>
		</div>
	)
}