import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import favAlbum from '../../img/fav_album.png'
import likedAlbum from '../../img/liked_album.jpg'
import point from '../../img/point.png'
import ProfileCard from '../ProfileCard/ProfileCard'
import { useGetTrackQuery } from '../../reduxToolkit/queryApi/tracksJamendo'
import './recently_played.scss'

export default function Recently_Played({ data, favArtists, playlists, statusArr }) {
    const [isLoading, setIsLoading] = useState(true)

    const [filteredData, setFilteredData] = useState([])
    const [onLoading, setOnLoading] = useState(true)

    console.log(statusArr);

    const {
        status, setStatus
    } = statusArr


    useEffect(() => {
        console.log(status);
        if (statusArr.status === undefined) {
            setOnLoading(true)
            console.log(1);
        } else {
            setOnLoading(false)
            console.log(2);
            getFilterArr(status)
        }
    }, [status])

    useEffect(() => {
        if (data) {
            setIsLoading(false)
        }
    }, [])

    const exampleArr = [{
        name: null,
        tracks: {
            image: false
        }
    }
    ]

    function getRandomElementsFromArray(array, count) {

        let availableTracks = []
        let randomElements = []

        for (let i = 0; i < array.length; i++) {
            if (array[i].tracks && array[i].tracks !== undefined) {
                availableTracks.push(array[i])
            }
        }

        while (randomElements.length < count && availableTracks.length > 0) {
            const randomIndex = Math.floor(Math.random() * availableTracks.length)
            const randomElement = availableTracks[randomIndex]

            if (!randomElements.some((element) => element.name === randomElement.name)) {
                randomElements.push(randomElement)
            }
            availableTracks.splice(randomIndex, 1)
        }
        return randomElements;
    }

    // console.log(data);
    const currentPlaylistsArr = getRandomElementsFromArray(playlists, 4)
    // console.log(currentPlaylistsArr);

    // console.log(onLoading);

    function getFilterArr(type) {
        setStatus(type);
        switch (type) {
            case 'Artist':
                console.log(favArtists);
                setFilteredData(favArtists);
                break;
            case 'Playlist':
                const randomPlaylists = getRandomElementsFromArray(playlists, 4);
                console.log(randomPlaylists);
                setFilteredData(randomPlaylists);
                break;
        }
    }


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
                        onLoading ? (
                            <div>
                                {favArtists.map((item, key) => (
                                    <ProfileCard data={item} dataAlbum={exampleArr} key={uuidv4()} />
                                ))}
                                {currentPlaylistsArr.map((item, key) => (
                                    <ProfileCard data={exampleArr} dataAlbum={item} key={uuidv4()} />
                                ))}
                            </div>
                        ) : (
                            <div>
                                {filteredData.map((item, key) => (
                                    <ProfileCard data={exampleArr} dataAlbum={item} key={uuidv4()} />
                                ))}
                            </div>
                        )
                    }
                </div>
            </div>
        )
    )
}