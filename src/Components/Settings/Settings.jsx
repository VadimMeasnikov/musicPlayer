import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ChevronLeft from "../../img/ChevronLeft.png"
import userSettings from "../../img/userSettings.png"
import ChevronRight from "../../img/ChevronRight.png"
import Navigation from "../../Components/Navigation/Navigation"
import GoBackButton from '../../Components/GoBackButton/GoBackButton'
import defaultImg from '../../img/default.png'
import { useAvatar } from '../../hooks/useAvatar'
import { getAuth } from 'firebase/auth'
import { setPhoto } from '../../reduxToolkit/slices/userPhoto'
import { useDispatch } from 'react-redux'
import { getCurrentAvatar } from '../../Pages/Home/getCurrentAvatar'
import { Link } from 'react-router-dom'


import "./settings.scss"


export default function Settings({ modalArr, photoObj }) {
    const { isSettings, setIsSettings } = modalArr
    const [username, setUsername] = useState('')
    const { userPhoto, setUserPhoto } = photoObj

    const user = useSelector(state => state.user)

    return (
        <div className='setting__page'>

            <div className="header">
                <div className="header-components">
                    <button className='go_back__btn' onClick={() => setIsSettings(false)}> <img src={ChevronLeft} alt="" /></button>
                    <h1>Settings</h1>
                </div>
            </div>
            <main>
                <div className="Settings-profile">
                    <div className="Settings-profile-information">
                        <div className="user__photo_box"><img className='user__photo' src={userPhoto} alt="" /></div>
                        <div className="Settings-profile-text">
                            <p className='name'>{user.username}</p>
                            <p className='view'>View Profile</p>
                        </div>
                    </div>
                    <img className='user-chevronRight' src={ChevronRight} alt="" />
                </div>
             
                <div className="settings">
                    <Link to='/editprofile' className="settings-user">
                        <p>Account</p>
                        <img src={ChevronRight} alt="" />
                    </Link>
                    <Link to='/history' className="settings-user">
                        <p>History</p>
                        <img src={ChevronRight} alt="" />
                    </Link>
                    <div className="settings-user">
                        <p>Data Saver</p>
                        <img src={ChevronRight} alt="" />
                    </div>
                    <div className="settings-user">
                        <p>Languages</p>
                        <img src={ChevronRight} alt="" />
                    </div>
                    <div className="settings-user">
                        <p>Playback</p>
                        <img src={ChevronRight} alt="" />
                    </div>
                    <div className="settings-user">
                        <p>Explicit Content</p>
                        <img src={ChevronRight} alt="" />
                    </div>
                    <div className="settings-user">
                        <p>Devices</p>
                        <img src={ChevronRight} alt="" />
                    </div>
                    <div className="settings-user">
                        <p>Car</p>
                        <img src={ChevronRight} alt="" />
                    </div>
                    <div className="settings-user">
                        <p>Social</p>
                        <img src={ChevronRight} alt="" />
                    </div>
                    <div className="settings-user">
                        <p>Voice Assistant & Apps</p>
                        <img src={ChevronRight} alt="" />
                    </div>
                    <div className="settings-user">
                        <p>Audio Quality</p>
                        <img src={ChevronRight} alt="" />
                    </div>
                    <div className="settings-user">
                        <p>Storage</p>
                        <img src={ChevronRight} alt="" />
                    </div>
                </div>
                <Navigation />
            </main>
        </div>
    )
}
