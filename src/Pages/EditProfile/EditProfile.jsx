import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import GoBackButton from '../../Components/GoBackButton/GoBackButton'
import defaultImg from '../../img/default.png'
import './edit_profile.scss'



export default function EditProfile() {

    const [userPhoto, setUserPhoto] = useState(defaultImg)

    return (
        <div className='edit_profile'>
            <div className="edit_profile_container">
                <div className="edit_profile__title_box">
                     <GoBackButton className='go_back__btn_ep' />
                     <h1 className='page__title'>Your Profile</h1>
                </div>
                <div className="user_profile_content">
                    <div className="user_logo__box">
                        <img className='user__photo' src={userPhoto} alt="" />
                    </div>
                    <div className="user_text__content">
                        <p className='user__name'>Max</p>
                    </div>
                </div>


            </div>
        </div>
    )
}
