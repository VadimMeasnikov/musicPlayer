import React, { useState, useEffect } from 'react'
import { clearHistory } from '../../reduxToolkit/slices/historySlice'
import openBtn from '../../img/Add.png'
import Recently_Played from '../../Components/Recently_Played/Recently_Played'
import twoArrows from '../../img/twoArrows.svg'
import fourSquares from '../../img/fourSquares.svg'
import Navigation from "../../Components/Navigation/Navigation";
import { useGetTrackQuery } from '../../reduxToolkit/queryApi/tracksJamendo'
import { useSelector } from 'react-redux'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import Settings from '../../Components/Settings/Settings'
import defaultImg from '../../img/default.png'
import { useNavigate } from 'react-router-dom'
import { CgSpinnerTwoAlt } from "react-icons/cg";
import LastTrack from '../../Components/LastTrack/LastTrack'
import './profile.scss'





export default function Profile() {
	const [featured, setFeatured] = useState([])
	const [status, setStatus] = useState(undefined)
	const [isSettings, setIsSettings] = useState(false)
	const [userPhoto, setUserPhoto] = useState(defaultImg)
	const [isPageLoading, setIsPageLoading] = useState(false)

	const [isLastTrack, setIsLastTrack] = useState(true)

	const photoObj = { userPhoto, setUserPhoto }
	const { data } = useGetTrackQuery()

	const photo = useSelector(state => state.userPhoto.photo)
	const user = useSelector(state => state.user)

	const navigate = useNavigate()
	const auth = getAuth()

	const playlists = useSelector((state) => state.playlists.tracks);
	const favArtists = useSelector(
		(state) => state.userArtists.userAppArtists
	);
	const favTracks = useSelector((state) => state.likes.likedTracks)


	useEffect(() => {
		console.log(1);
		onAuthStateChanged(auth, (userSt => {
			if (user.email == null) {
				setIsPageLoading(true)
				navigate('/')
			}
		}))

	}, [])

	useEffect(() => {
		if (data) {
			setFeatured(data.results)
			setStatus(data.result)
		}
	}, [data])

	useEffect(() => {
		if (photo && photo !== undefined) {
			setUserPhoto(photo)
		} else {
			setUserPhoto(defaultImg)
		}
	}, [photo])

	const statusArr = { status, setStatus }
	const modalArr = { isSettings, setIsSettings }

	return (
		<div className='profile'>
			{isPageLoading ? (
				<CgSpinnerTwoAlt />
			) : (
				isSettings ? (
					<Settings modalArr={modalArr} photoObj={photoObj} className='settings' />
				) : (
					<div className={`profile_container ${isSettings ? 'hidden' : 'fade-in'}`}>
						<div className='your_library'>
							<div className='profile_logo'>
								<img className='user__photo' src={userPhoto} alt='' />
								<p className='title'>Your Library</p>
							</div>
							<button onClick={() => setIsSettings(true)} className='plus_btn'>
								<img src={openBtn} alt='' />
							</button>
						</div>
						<div className='recently_played'>
							<Recently_Played data={featured} favTracks={favTracks} favArtists={favArtists} playlists={playlists} statusArr={statusArr} />
							{isLastTrack && <LastTrack/>}
							<Navigation />
						</div>
					</div>
				)
			)}
		</div>
	);
}