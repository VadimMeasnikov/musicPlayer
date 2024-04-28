import React, { useState, useEffect } from 'react'
import openBtn from '../../img/Add.png'
import Recently_Played from '../../Components/Recently_Played/Recently_Played'
import exampleAvatar from '../../img/exampleProfileAvatar.png'
import twoArrows from '../../img/twoArrows.svg'
import fourSquares from '../../img/fourSquares.svg'
import Settings from '../UserSettings/Settings'
import Navigation from "../../Components/Navigation/Navigation";
import { useGetTrackQuery } from '../../reduxToolkit/queryApi/tracksJamendo'
import { useSelector } from 'react-redux'
import './profile.scss'



export default function Profile() {
	const [featured, setFeatured] = useState([])
	const [status, setStatus] = useState(undefined)
	const [isSettings, setIsSettings] = useState(false)
	const { data } = useGetTrackQuery()

	const playlists = useSelector((state) => state.playlists.tracks);
	const favArtists = useSelector(
		(state) => state.userArtists.userAppArtists
	);

	useEffect(() => {
		if (data) {
			setFeatured(data.results)
			setStatus(data.result)
		}
	}, [data])

	function handleButtonClick(status) {
		setStatus(status)
		return status
	}

	const statusArr = { status, setStatus }
	const modalArr = {isSettings, setIsSettings}

	return (
		<div className='profile'>
			{isSettings ? (
				<Settings modalArr={modalArr} className='settings'/>
			) : (
				<div className={`profile_container ${isSettings ? 'hidden' : 'fade-in'}`}>
					<div className='your_library'>
						<div className='profile_logo'>
							<img src={exampleAvatar} alt='' />
							<p className='title'>Your Library</p>
						</div>
						<button onClick={() => setIsSettings(true)} className='plus_btn'>
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
						<Recently_Played data={featured} favArtists={favArtists} playlists={playlists} statusArr={statusArr} />
						<Navigation />
					</div>
				</div>
			)}
		</div>
	)
}