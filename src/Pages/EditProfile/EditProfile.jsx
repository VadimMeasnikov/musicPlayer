import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useAvatar } from '../../hooks/useAvatar'
import { getCurrentAvatar } from '../Home/getCurrentAvatar'
import { setPhoto } from '../../reduxToolkit/slices/userPhoto'
import defaultImg from '../../img/default.png'
import leftArrow from '../../img/ChevronLeft.png'
import './edit_profile.scss'




export default function EditProfile() {

    const [userPhoto, setUserPhoto] = useState(defaultImg)
    const [username, setUsername] = useState('')
    const [isChanged, setIsChanged] = useState(false)

    const dispatch = useDispatch()
    const auth = getAuth()
    const userFb = auth.currentUser


    const user = useSelector(state => state.user)
    const photo = useSelector(state => state.userPhoto.photo);

    useEffect(() => {
        if (photo && photo !== undefined) {
            setUserPhoto(photo)
            const timeout = setTimeout(() => {
                setIsChanged(false);
            }, 3500);
            return () => clearTimeout(timeout);
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
                dispatch(setPhoto({ photo: avatar }))
            })
    }

    return (
        <div className='edit_profile'>

            <div className="edit_profile_container">
                <div className="edit_profile__title_box">
                    <Link id='go_back__btn_ep' to='/profile'><img src={leftArrow} alt="" /></Link>
                    <h1 className='page__title'>Your Profile</h1>
                    {
                        isChanged && (
                            <div className='warning_box'><p>To work correctly, we recommend that you restart the application</p></div>
                        )
                    }
                </div>
                <div className="user_profile_content">
                    <div className="user_logo__box">
                        <img className='user__photo' src={userPhoto} alt="" />
                    </div>
                    <div className="user_text__content">
                        <p className='user__name'>Max</p>
                    </div>
                </div>
                <div className="user_correct_content">
                    <div className="createAvatar">
                        <input type="file" onChange={(e) => handleAvatarChange(e)} />
                    </div>

                </div>
            </div>
        </div>
    )
}
