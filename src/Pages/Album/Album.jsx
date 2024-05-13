import React, { useEffect, useState } from 'react'
import find from '../../img/find.png'
import defaultImg from '../../img/default.png'
import like from '../../img/like_album.png'
import vector from '../../img/album_vector.png'
import { IoPlaySharp } from "react-icons/io5";
import { IoPauseOutline } from "react-icons/io5";
import { PiHeartThin } from "react-icons/pi";
import { FcLike } from "react-icons/fc";
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchQuery } from '../../reduxToolkit/queryApi/searchJamendo'
import { addLikedTrack, removeLikedTracks } from '../../reduxToolkit/slices/favouriteTracks'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import sad from '../../img/sad.png'
import { clearAlbum } from '../../reduxToolkit/slices/albumSlice'
import defaultAlbum from '../../img/defaultAlbum.jpg'
import MiniPlayerCard from '../../Components/MiniPlayerCard/MiniPlayerCard'
import GetCurrentColor from '../../GetCurrentColor'
import { CgSpinnerTwoAlt } from "react-icons/cg";
import useSound from 'use-sound'
import './album.scss'

export default function Album() {

    const [isLoading, setIsLoading] = useState(true)
    const [isPlay, setIsPlay] = useState(false)
    const [isLiked, setIsLiked] = useState(false)
    const [albumImage, setAlbumImage] = useState(defaultAlbum)
    const [likedTracks, setLikedTracks] = useState([]);
    const [tracks, setTracks] = useState([]);
    const [averageColor, setAverageColor] = useState('')
    const [dataResult, setDataResult] = useState([])

    const [URL, setURL] = useState(false)

    const [search, setSearch] = useState('')
    const [isEmpty, setIsEmpty] = useState(false)

    const [audioData, setAudioData] = useState('')
    const [trackIndex, setTrackIndex] = useState(0)

    const url = 'https://prod-1.storage.jamendo.com/?trackid=174&format=mp31&from=1dRl3MJ26HAnlw%2BHOZzo0A%3D%3D%7CIqeW6CFxyx9BAW33JkkX2g%3D%3D'
    const [play, { stop }] = useSound(url)

    const likedTracksStore = useSelector((state) => state.likes.likedTracks);
    const data = useSelector((state) => state.album.albumData);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function handleLikeAlbum() {
        setIsLiked(false)
    }
    function handleDislikeAlbum() {
        setIsLiked(true)
    }

    function handleStartAlbum() {
        const url = tracks[trackIndex]?.audio
        const correctUrl = url.replace("format=mp31", "format=mp3")
        setURL(correctUrl)
        play();
        setIsPlay(true)
    }

    function handlePauseAlbum() {
        stop()
        setIsPlay(false)
    }

    function playNext() {
        play()
        setTrackIndex(pr => pr + 1)
    }

    useEffect(() => {
        if (URL) {
            console.log(URL);
            function handleTrackEnd() {
                if (trackIndex < tracks.length - 1) {
                    playNextTrack()
                }
            }

            play({ onend: handleTrackEnd })

            return () => {
                stop()
            }
        }


    }, [play, stop, trackIndex, tracks, URL])

    const goBack = () => {
        setTimeout(() => {
            dispatch(clearAlbum());
        }, 500);
    };

    useEffect(() => {
        if (data.image) {
            setAlbumImage(data.image)
        }
        if (data) {
            getAlbumTracks(data);
        }
    }, [data]);





    async function getAlbumTracks(data) {
        console.log(data);
        const response = await fetch(
            `https://api.jamendo.com/v3.0/tracks/?client_id=354e8ba5&format=jsonpretty&limit=all&artist_name=${data.artist_name}&album_name=${data.name}`
        );
        const tracksData = await response.json();
        console.log(tracksData.results);
        setDataResult(tracksData.results)
        setTracks(tracksData.results)
        setIsLoading(false)
        return tracksData.results
    }

    useEffect(() => {
        const hasUndefinedValues = tracks.some(track => {
            return track.name === undefined || track.audio === undefined;
        });
    }, [tracks, dataResult, audioData])



    useEffect(() => {
        setLikedTracks(likedTracksStore);
    }, [likedTracksStore]);

    const handleTrackLike = (track) => {
        const isTrackLiked = likedTracksStore.some(
            (likedTrack) => likedTrack.id === track.id
        );
        if (!isTrackLiked) {
            setLikedTracks(track);
            dispatch(addLikedTrack(track));
        } else {
            const updatedLikedTracks = likedTracks.filter(
                (likedTrack) => likedTrack.id !== track.id
            );
            setLikedTracks(updatedLikedTracks);
            dispatch(removeLikedTracks(track.id));
        }
    };

    const handleColorGeneration = (color) => {
        setAverageColor(color);
    };

    const bg = `linear-gradient(to bottom, ${averageColor}, rgb(0, 0, 0))`
    const brighterColor = `brightness(120%)`;
    const bgInp = `linear-gradient(to bottom, ${brighterColor}, ${averageColor}, rgb(0, 0, 0))`;

    const isLastTrack = trackIndex === tracks.length - 1;


    // console.log(tracks[trackIndex].audio);

    function getDataInAlbum(e, array) {
        e.preventDefault();
        if (search) {
            setIsEmpty(false)
            const filtered = array.filter(item => {
                return item.name.toLowerCase().includes(search.toLowerCase());
            });
            setTracks(filtered)
            if (filtered.length === 0) {
                setIsEmpty(true)
            }
        } else if (search.length === 0) {
            setTracks(array)
        }
    }

    return (
        isLoading ? (
            <div className="spinner-container">
                <CgSpinnerTwoAlt className="spinner" />
            </div>
        ) : (
            <div className='album'>
                <div className="album_container" >
                    <GetCurrentColor imageUrl={albumImage} onColorGenerated={handleColorGeneration} />
                    <div className="album_color__top" style={{ background: bg }}>
                        <div className="album_title_box">
                            <button onClick={() => { navigate(-1), goBack() }} className="go_back__button__album">
                                <svg
                                    width="20px"
                                    height="20px"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                                    <g
                                        id="SVGRepo_tracerCarrier"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <g id="SVGRepo_iconCarrier">
                                        {" "}
                                        <path
                                            d="M14.9998 19.9201L8.47984 13.4001C7.70984 12.6301 7.70984 11.3701 8.47984 10.6001L14.9998 4.08008"
                                            stroke="#FFFFFF"
                                            strokeWidth="2.4"
                                            strokeMiterlimit="10"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />{" "}
                                    </g>
                                </svg>
                            </button>
                            <h1 className='album_title'>Album</h1>
                        </div>

                        <div className="album_search_content">
                            <form onSubmit={(e) => getDataInAlbum(e, dataResult)} className='search_in_plsylist__form'>
                                <div style={{ background: bgInp }} className="search_box">
                                    <label><img src={find} alt="" /></label>
                                    <input
                                        onChange={(e) => setSearch(e.target.value)} className='search_content' type="text" placeholder='Find in playlist' />
                                </div>
                                <button style={{ background: bgInp }} className='submit_search' type='submit'>Sort</button>
                            </form>
                        </div>


                        <div className="album_content">
                            <div className="album_logo">
                                <img src={albumImage} alt="" />
                            </div>
                            <div className="text_box_content">

                                <div className="main_buttons_info">
                                    <div className="content__1__info">
                                        <div className="main_album__info">
                                            <div className="content_text">
                                                <p className='info_1'>New and approved indie pop. Cover: No Rome</p>
                                                <p className='album__info'>1,629,592 likes • 6h 48m</p>
                                            </div>
                                            <div className="album_buttons">
                                                <div className="like_btn">
                                                    {isLiked ? (
                                                        <button onClick={() => handleLikeAlbum()} className='album_like__btn'>
                                                            <FcLike className='like_content' />
                                                        </button>
                                                    ) : (
                                                        <button onClick={() => handleDislikeAlbum()} className='album_like__btn'>
                                                            <img className='like_content' src={like} alt="" />
                                                        </button>
                                                    )}
                                                </div>
                                                <div className="button_2">
                                                    <button className='album__btn__2'><img src={vector} alt="" className='button_content' /></button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="content_2__buttons">

                                            {
                                                isPlay ?
                                                    (<IoPauseOutline onClick={() => handlePauseAlbum()} className='album__btn' />)
                                                    :
                                                    (<IoPlaySharp onClick={() => handleStartAlbum()} className='album__btn' />)
                                            }


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        isLoading ? (
                            <CgSpinnerTwoAlt className="spinner" />
                        ) : isEmpty ? (
                            <div className='sad_box'>
                                <div className="sad_box_container">
                                    <p>Unfortunately, nothing was found. Please check the name of the song you are looking for.</p>
                                    <img className='sad_img' src={sad} alt="" />
                                </div>
                            </div>
                        ) : (
                            <div className="album_tracks_box">
                                <ol className="album-tracks">
                                    {
                                        tracks
                                            .sort((a, b) => a.position - b.position)
                                            .map((item, index) => (
                                                <MiniPlayerCard key={item.id} info={item} />
                                            ))
                                    }
                                </ol>
                            </div>
                        )
                    }

                </div>
            </div>
        )
    )
}