import React, { useState, useEffect } from 'react'
import openBtn from '../../img/Add.png'
import Recently_Played from '../../Components/Recently_Played/Recently_Played'
import exampleAvatar from '../../img/exampleProfileAvatar.png'
import twoArrows from '../../img/twoArrows.svg'
import fourSquares from '../../img/fourSquares.svg'
import ProfileCard from '../../Components/ProfileCard/ProfileCard'
import Navigation from "../../Components/Navigation/Navigation";
import { useGetTrackQuery } from '../../reduxToolkit/queryApi/tracksJamendo'
import './profile.scss'


export default function Profile() {
	const [featured, setFeatured] = useState([])
	const [selectedStatus, setSelectedStatus] = useState()
	const { data } = useGetTrackQuery()

	useEffect(() => {
		if (data) {
			setFeatured(data.results)
			setSelectedStatus(data.result)
			console.log(data.results);
		}
	}, [data])

	function handleButtonClick(status){
		setSelectedStatus(status)
	}

	return (
		<div className='profile'>
			<div className='profile_container'>
				<div className='your_library'>
					<div className='profile_logo'>
						<img src={exampleAvatar} alt='' />
						<p className='title'>Your Library</p>
					</div>
					<button className='plus_btn'>
						<img src={openBtn} alt='' />
					</button>
				</div>
				<div className='four_buttons'>
					<button onClick={() => handleButtonClick('Playlist')} className='profile_button'>Playlists</button>
					<button onClick={() => handleButtonClick('Artist')} className='profile_button'>Artists</button>
					<button onClick={() => handleButtonClick('Album')} className='profile_button'>Albums</button>
					<button onClick={() => handleButtonClick('Podcast & Show')} className='profile_button'>Podcasts & Shows</button>
				</div>
				<div className='recently_played'>
					<div className='row'>
						<div className='mini_title'>
							<img src={twoArrows} alt='' />
							<p className='near_text'>Recently Played</p>
						</div>
						<img src={fourSquares} alt='' />
					</div>
					<Recently_Played data={featured} status={selectedStatus}/>
					<Navigation />
				</div>
			</div>
		</div>
	)
}
