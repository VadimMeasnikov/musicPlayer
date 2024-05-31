import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import favAlbum from '../../img/fav_album.png'
import likedAlbum from '../../img/liked_album.jpg'
import point from '../../img/point.png'
import ProfileCard from '../ProfileCard/ProfileCard'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RiPushpin2Fill } from "react-icons/ri";
import './recently_played.scss'


export default function Recently_Played({ data, favArtists, playlists, statusArr }) {
    const [isLoading, setIsLoading] = useState(true)
    const [songsCountText, setSongsCountText] = useState('song')
    const [filteredData, setFilteredData] = useState([])
    const [onLoading, setOnLoading] = useState(true)
    const {status, setStatus} = statusArr
    const [isLikedSongs, setIsLikedSogns] = useState(true)

    const liked = useSelector(state => state.likes.likedTracks)

    useEffect(() => {
        if (statusArr.status === undefined) {
            setOnLoading(true)
        } else {
            setOnLoading(false)
            getFilterArr(status)
        }
    }, [status])

    useEffect(() => {
        if (data) {
            setIsLoading(false)
        }
    }, [])

    useEffect(() =>  {
      if(liked.length !== 0  && liked.length !== 1 ){ 
         setSongsCountText('songs')
      }
    }, [liked])

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
        return randomElements
    }

   
    const currentPlaylistsArr = getRandomElementsFromArray(playlists, 4)

    function getFilterArr(type) {
        setStatus(type);
        switch (type) {
            case 'Artist':
                setFilteredData(favArtists);
                break;
            case 'Playlist':
                const randomPlaylists = getRandomElementsFromArray(playlists, 4);
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
                    <Link to='/userlikes' className="liked_songs">
                        <div className="liked_songs_container">
                            <div className="liked_songs_logo">
                                   <img className='liked_img' src={likedAlbum} alt="" />
                            </div>
                            <div className="liked_songs_info">
                                <p className='album_title'>Liked Songs</p>
                                <div className="liked_songs_info_content">
                                    <RiPushpin2Fill/>
                                    <p className='status_info'>Playlist</p>
                                    <p>•</p>
                                    <p className='volume_album'>{liked.length} {songsCountText}</p>
                                </div>
                            </div>
                        </div>
                    </Link>


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