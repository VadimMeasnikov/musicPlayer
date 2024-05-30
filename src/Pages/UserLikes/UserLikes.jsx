import React, { useEffect, useRef, useState } from 'react'
import likedAlbum from '../../img/liked_album.jpg'
import GoBackButton from '../../Components/GoBackButton/GoBackButton'
import { useSelector } from 'react-redux'
import AlbumCard from '../../Components/AlbumCard/AlbumCard'
import { CgSpinnerTwoAlt } from "react-icons/cg";
import sad from '../../img/sad.png';
import './user_likes.scss'



export default function UserLikes() {

    const [albumLength, setAlbumLength] = useState()
    const [albumDuration, setAlbumDuration] = useState({ min: 0, sec: 0 })
    const [activeTrack, setActiveTrack] = useState()
    const [URL, setURL] = useState()
    const [isAuto, setIsAuto] = useState(false);
    const [isPageLoading, setIsPageLoading] = useState(false)
    const [isEmpty, setIsEmpty] = useState(true)
    const audioRef = useRef();
    const tracks = useSelector(state => state.likes.likedTracks)

    useEffect(() => {
        if (tracks) {
            if (tracks.length !== 0) {
                setIsEmpty(false)
                setAlbumLength(tracks.length)
                const totalDuration = tracks.reduce((acc, item) => {
                    return acc + item.duration;
                }, 0);
                createCurrentDuration(totalDuration)
            } else {
                setIsEmpty(true)
                setAlbumLength(0)
                setAlbumDuration({ min: 0, sec: 0 })
            }
        }
    }, [tracks])

    function createCurrentDuration(duration) {
        let min = Math.floor(duration / 60)
        let sec = duration % 60
        const time = { min, sec }
        setAlbumDuration(time)
        return time
    }

    function handleClickActive(info) {

        if (info === activeTrack) {
            setActiveTrack(false);
            setURL(activeTrack.audio)
            audioRef.current.pause();
        } else {
            setActiveTrack(info);
            audioRef.current.play();
        }
    }


    return (
        <div className='user_likes'>
            <audio className='audio_element' ref={audioRef} src={URL} autoPlay={isAuto} controls></audio>
            {isPageLoading ? (
                <CgSpinnerTwoAlt />
            )
                :
                (
                    <div className="user_likes_container">
                        <div className="user_likes__title_box">
                            <GoBackButton/>
                            <h1 className='title_text'>Your Liked Songs</h1>
                        </div>
                        <div className="user_likes_content">
                            <div className="album_content">
                                <img className='likes_img' src={likedAlbum} alt="" />
                                <div className="album_data">
                                    <p className='album_likes_length'>Треков: {albumLength}</p>
                                    <p className='album_likes_duration'>Продолжительность: {albumDuration.min}м {albumDuration.sec}c</p>
                                </div>
                            </div>
                            <div className="user_likes_songs">
                                {isEmpty ? (
                                    <div className='empty_box'>
                                        <div className="empty_box_container">
                                            <p>Unfortunately, you don't have any liked tracks right now. If you like a track, then you can click the like icon and it will be added to this album.</p>
                                            <img className='sad_img' src={sad} alt="" />
                                        </div>
                                    </div>
                                ) : (
                                    tracks.map(item => (
                                        <AlbumCard className='card' key={item.id} info={item} isActive={item === activeTrack} img={item.album_image} handleClickActive={handleClickActive} />
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                )
            }

        </div>
    )
}
