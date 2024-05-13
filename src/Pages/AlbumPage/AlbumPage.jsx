import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { clearAlbum } from '../../reduxToolkit/slices/albumSlice'
import GoBackButton from '../../Components/GoBackButton/GoBackButton'
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaCirclePlay } from "react-icons/fa6";
import { FaCirclePause } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";
import { addLikedTrack, removeLikedTracks } from "../../reduxToolkit/slices/favouriteTracks";
import './AlbumPage.scss'

export default function AlbumPage() {

    

    return (
        <>
            <div className="discography-topPanel">
                <GoBackButton className="GoBackBtn" onClick={goBack} />
            </div>
            <div className="album">
                <div className="album-info">
                    <img src={data.image} alt="" />
                    <div className="album-textInfo">
                        <div className="name">
                            <p>Album</p>
                            <h1>{data.name}</h1>
                            <span>{data.artist_name} • {data.releasedate.slice(0, 4)} • {tracks.length} tracks</span>
                        </div>
                        <div className="buttons">
                            <FaCirclePlay className="funcBtn playBtn" />
                            <FaRegHeart className="funcBtn likeBtn" />
                            <BsThreeDots className="funcBtn settingsBtn" />
                        </div>
                    </div>
                </div>
                <div className="albumTrackPositionPanel">
                    <div className="trackIndex">#</div>
                    <div className="trackTitle">Title</div>
                </div>
              
            </div>
        </>
    )
}
