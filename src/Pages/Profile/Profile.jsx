import React from 'react'
<<<<<<< HEAD
import openBtn from '../../img/Add.png'
import Recently_Played from '../../Components/Recently_Played/Recently_Played'
import './profile.scss'

export default function Profile() {

    const photoProfile = null //доставать из бд

    return (
        <div className='profile'>
            <div className="profile_container">
                <div className="profile_info">
                    <div className="profile_info_main">
                        <img src={photoProfile} alt="" />
                        <h1 className='profile_page__title'>Your library</h1>
                    </div>
                    <div className="profile_info_second">
                        <button className='open_modal__btn'><img src={openBtn} alt="" /></button>
                    </div>
                </div>

                <div className="filter_categories">
                    <button className='filter_ctg__btn'><p>Playlists</p></button>
                    <button className='filter_ctg__btn'><p>Artists</p></button>
                    <button className='filter_ctg__btn'><p>Albums</p></button>
                    <button className='filter_ctg__btn'><p>Podcasts & Shows</p></button>
                </div>

                <Recently_Played />
            </div>
        </div>
    )
=======
import "./profile.scss"
import Navigation from "../../Components/Navigation/Navigation"
import ChevronLeft from "../../img/ChevronLeft.png"
import More from "../../img/More.png"
import userImgProfile from "../../img/userImgProfile.png"
import ChevronRight from "../../img/ChevronRight.png"

export default function Profile() {
  return (
    <>
    <div className="background">
    <div className='header'>
        <img src={ChevronLeft} alt="" />
        <img src={More} alt="" />
    </div>
    <div className="profile">
        <img src={userImgProfile} alt="" />
        <button>Edit Profile</button>
    </div>
    <div className="profile-statistics">
        <div className="profile-statistics-playlist">
            <div className="number">23</div>
            <div className='text'>PLAYLISTS</div>
        </div>
        <div className="profile-statistics-followers">
        <div className="number">58</div>
            <div className='text'>FOLLOWERS</div>
        </div>
        <div className="profile-statistics-following">
        <div className="number">43</div>
            <div className='text'>FOLLOWING</div>
        </div>
    </div>
    </div>
    <div className="main">
        <h1>Playlists</h1>
        <div className="playlists">

        </div>
        <div className="all-playlists">
            <p>See all playlists</p>
            <img src={ChevronRight} alt="" />
        </div>
    </div>
    <Navigation />
    </>
  )
>>>>>>> 7ca4cfc8ab0422602f2a37cec06bf858bb07f365
}
