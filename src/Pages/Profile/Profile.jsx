import React from 'react'
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
}
