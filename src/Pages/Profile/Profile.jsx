import React from 'react'
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
}
