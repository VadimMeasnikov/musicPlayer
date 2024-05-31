import React, { useEffect, useState } from 'react'
import defaultImg from "../../img/default.png";
import { IoIosMore } from "react-icons/io";
import { Link } from 'react-router-dom';
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { addLikedTrack, removeLikedTracks } from '../../reduxToolkit/slices/favouriteTracks';
import { IoPlay } from "react-icons/io5";
import share from '../../img/Share.png'
import addToAlbum from '../../img/add_to_album.png'
import { TfiClose } from "react-icons/tfi";
import goToPlayer from '../../img/goToPlayer.png'
import twitter from '../../img/twitter.png'
import link from '../../img/Link.png'
import whatsup from '../../img/whatsup.png'
import message from '../../img/message.png'
import { addSearch } from '../../reduxToolkit/slices/userSearch';
import { useLastTrack } from '../../hooks/useLastTrack';

import './album_card.scss'



export default function AlbumCard({ info, img, isActive, handleClickActive }) {
    const [src, setSrc] = useState(info.image || img);
    const [isMore, setIsMore] = useState(false)
    const [likedTracks, setLikedTracks] = useState([]);
    const [isLike, setIsLike] = useState(false)
    const [isModal, setIsModal] = useState(false)

    const likedTracksStore = useSelector(state => state.likes.likedTracks)
    const { key } = useSelector(state => state.userKey)

    const field = 'liked'
    const dispatch = useDispatch()

    useEffect(() => {
        if (info && !info.image && !img) {
            setSrc(defaultImg);
        }
    }, [info]);

    useEffect(() => {
        setLikedTracks(likedTracksStore);
    }, [likedTracksStore]);

    useEffect(() => {
        if (isModal) {
            setIsMore(false)
        }
    }, [isModal])

    function handleClick(info) {
        handleClickActive(info)
        correctLastTrack(info)
    }

    function correctLastTrack(track) {
        localStorage.setItem('track', JSON.stringify(track));
    }

    const handleTrackLike = (track) => {
        const isTrackLiked = likedTracksStore.some(
            (likedTrack) => likedTrack.id === track.id
        );
        if (!isTrackLiked) {
            setLikedTracks(track);
            setIsLike(true)
            dispatch(addLikedTrack(track));
        } else {
            const updatedLikedTracks = likedTracks.filter(
                (likedTrack) => likedTrack.id !== track.id
            );
            setLikedTracks(updatedLikedTracks);
            dispatch(removeLikedTracks(track.id));
        }
        return isTrackLiked
    };

    function addDataTrack(track) {
        dispatch(addSearch(track))
    }

    const bg = {
        background: isActive ? 'rgba(50, 50, 50, 0.5)' : 'inherit',
    };


    return (
        <div onClick={() => { handleClick(info); setIsMore(false) }} className="album_card" style={bg}>
            <img src={src} className="album_card__image" alt="album" />
            <div className="album_card__content">
                <div className="text_content">
                    <p className="album_card__title">{info.name}</p>
                    <p className="album_card__artist">{info.artist_name}</p>
                </div>
                <div className="funct_content" onClick={(e) => e.stopPropagation()}>
                    <button id='more_info_button' onClick={() => setIsMore(pr => !pr)}><IoIosMore className='button_content' /></button>
                    {isMore && (
                        <div className={`more_info_box ${isMore ? ('open') : ('close')}`} >
                            <div className="more_info_box__container">
                                <button className='more_info_content' id='first_btn' onClick={() => {
                                    handleTrackLike(info);
                                    setIsMore(false)
                                }}>
                                    <div className="btn_image_content">
                                        {likedTracksStore.some(
                                            (likedTrack) => likedTrack.id === info.id
                                        ) ? (
                                            <FaHeart className='like_img' />
                                        ) : (
                                            <FaRegHeart className='like_img' />
                                        )}
                                    </div>

                                    <div className='btn_text_content '><p>Like</p></div>
                                </button>



                                <Link to={`/player/${info.id}`} className='more_info_content ' id='third_btn' onClick={() => { addDataTrack(info); setIsMore(false)}}>
                                    <div className="btn_image_content">
                                        <IoPlay/>
                                    </div>
                                    <div className='btn_text_content'>  <p className='btn_text_content'>Play</p></div>

                                </Link>

                            </div>

                        </div>)}
                </div>
            </div>
            {
                isModal &&
                (
                    <div className={`modal_container ${isMore ? ('open') : ('close')}`}>
                        <div className="modal_content">
                            <div className="source_container">
                                <button className="source_box">
                                    <div className="source_logo link">
                                        <img src={link} alt="" />
                                    </div>
                                    <p>Copy Link</p>

                                </button>

                                <button className="source_box">
                                    <div className="source_logo whatsup">
                                        <img src={whatsup} alt="" />
                                    </div>
                                    <p>WhatsApp</p>

                                </button>

                                <button className="source_box">
                                    <div className="source_logo twitter">
                                        <img src={twitter} alt="" />
                                    </div>
                                    <p>Twitter</p>

                                </button>

                                <button className="source_box">
                                    <div className="source_logo message">
                                        <img src={message} alt="" />
                                    </div>
                                    <p>Messages</p>

                                </button>
                            </div>

                        </div>
                        <button className='close_modal__btn' onClick={() => setIsModal(false)}><TfiClose className='close_modal__btn_content' /></button>
                    </div>
                )
            }
        </div>
    )
}
