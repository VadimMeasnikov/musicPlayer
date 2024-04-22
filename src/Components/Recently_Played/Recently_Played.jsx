import React, { useEffect, useState } from 'react'
import favAlbum from '../../img/fav_album.png'
import likedAlbum from '../../img/liked_album.jpg'
import point from '../../img/point.png'
import ProfileCard from '../ProfileCard/ProfileCard'
import { useGetTrackQuery } from '../../reduxToolkit/queryApi/tracksJamendo'
import './recently_played.scss'

export default function Recently_Played({ data, status }) {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (data) {
            setIsLoading(false)
            console.log(data);
        }
    }, [])


    const filteredData = data.filter((item) => item.status === status);

    return (
        isLoading ? (
            <p> Loading...</p >
        ) : (
            <div className='recently_played'>
                <div className="recently_played_container">
                    <div className="liked_songs">
                        <div className="liked_songs_container">
                            <div className="liked_songs_logo">
                                <img className='liked_img' src={likedAlbum} alt="" />
                            </div>
                            <div className="liked_songs_info">
                                <p className='album_title'>Liked Songs</p>
                                <div className="liked_songs_info_content">
                                    <img src={favAlbum} alt="" />
                                    <p className='status_info'>Playlist</p>
                                    <img src={point} alt="" />
                                    <p className='volume_album'>58 songs</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {
                        filteredData.map((item, key) => (
                            <ProfileCard data={item} key={item.artist_id} />
                        ))
                    }
                </div>
            </div>
        )
    )
}