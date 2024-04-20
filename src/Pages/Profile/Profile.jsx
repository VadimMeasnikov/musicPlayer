import React from 'react'
import openBtn from '../../img/Add.png'
import Recently_Played from '../../Components/Recently_Played/Recently_Played'
import exampleAvatar from '../../img/exampleProfileAvatar.png'
import twoArrows from '../../img/twoArrows.svg'
import fourSquares from '../../img/fourSquares.svg'
import ProfileCard from '../../Components/ProfileCard/ProfileCard'
import Navigation from "../../Components/Navigation/Navigation";
import './profile.scss'

export default function Profile() {
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
					<button className='profile_button'>Playlists</button>
					<button className='profile_button'>Artists</button>
					<button className='profile_button'>Albums</button>
					<button className='profile_button'>Podcasts & Shows</button>
				</div>
				<div className='recently_played'>
					<div className='row'>
						<div className='mini_title'>
							<img src={twoArrows} alt='' />
							<p className='near_text'>Recently Played</p>
						</div>
						<img src={fourSquares} alt='' />
					</div>
					{/* <ProfileCard/> */}
					<Navigation/>
				</div>
			</div>
		</div>
	)
}
