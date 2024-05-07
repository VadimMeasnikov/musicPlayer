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
import { getCurrentAvatar } from '../Home/getCurrentAvatar'
import "./settings.scss"


export default function Settings({ modalArr }) {
    const { isSettings, setIsSettings } = modalArr
    const [username, setUsername] = useState('')
    const [userPhoto, setUserPhoto] = useState(defaultImg)
    const [userAvatar, setUserAvatar] = useState(defaultImg)

    const dispatch = useDispatch()
    const auth = getAuth()
    const userFb = auth.currentUser

    const user = useSelector(state => state.user)
    const photo = useSelector(state => state.userPhoto.photo);

    useEffect(() =>{
      if(photo && photo !== undefined){
        setUserPhoto(photo)
      } else {
        setUserPhoto(defaultImg)
      }
    }, [photo])

     async function handleAvatarChange(e) {
        if (e.target.files[0]) {
            useAvatar(e.target.files[0], userFb)
            const avatar = getCurrentAvatar(userFb.uid)
        }
        getCurrentAvatar(userFb.uid)
        .then((avatar) => {
            setUserPhoto(avatar)
            return avatar
        })
        .then((avatar) => {
            dispatch(setPhoto({photo: avatar}))
        })
    }


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
                <div className="createAvatar">
                    <input type="file" onChange={(e) => handleAvatarChange(e)} />
                </div>
                <div className="settings">
                    <div className="settings-user">
                        <p>Account</p>
                        <img src={ChevronRight} alt="" />
                    </div>
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
