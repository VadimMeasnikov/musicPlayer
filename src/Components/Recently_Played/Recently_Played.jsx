import React from 'react'
import likedAlbum from '../../img/liked_album.jpg'

import './recently_played.scss'

export default function Recently_Played() {
    return (
        <div className='recently_played'>
            <div className="recently_played_container">
                <div className="played_page__title">
                    <p>Recently Played</p>
                </div>

                <div className="liked_songs">
                    <div className="liked_songs_container">
                        <div className="liked_songs_logo">
                            <img className='liked_img' src={likedAlbum} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
