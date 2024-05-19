import React, { useEffect, useRef, useState } from 'react'
import find from '../../img/find.png'
import like from '../../img/like_album.png'
import vector from '../../img/album_vector.png'
import { IoPlaySharp } from "react-icons/io5";
import { IoPauseOutline } from "react-icons/io5";
import { FcLike } from "react-icons/fc";
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addLikedTrack, removeLikedTracks } from '../../reduxToolkit/slices/favouriteTracks'
import { clearAlbum } from '../../reduxToolkit/slices/albumSlice'
import MiniPlayerCard from '../../Components/MiniPlayerCard/MiniPlayerCard'
import GetCurrentColor from '../../GetCurrentColor'
import { CgSpinnerTwoAlt } from "react-icons/cg";
import sad from '../../img/sad.png'
import defaultAlbum from '../../img/defaultAlbum.jpg'
import AlbumCard from '../../Components/AlbumCard/AlbumCard';
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

    const [URL, setURL] = useState(null)

    const [search, setSearch] = useState('')
    const [isEmpty, setIsEmpty] = useState(false)

    const [activeTrack, setActiveTrack] = useState(null)
    const [trackIndex, setTrackIndex] = useState(0)
    const [isAuto, setIsAuto] = useState(false)

    const likedTracksStore = useSelector((state) => state.likes.likedTracks);
    const data = useSelector((state) => state.album.albumData);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const audioRef = useRef()

    function handleLikeAlbum() {
        setIsLiked(false)
    }
    function handleDislikeAlbum() {
        setIsLiked(true)
    }

    function audioToggle() {
        const audio = audioRef.current
        if (audio.paused) {
            audio.play()
            setIsPlay(true)
        }
        else {
            audio.pause()
            setIsPlay(false)
        }
    }



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
        const response = await fetch(
            `https://api.jamendo.com/v3.0/tracks/?client_id=354e8ba5&format=jsonpretty&limit=all&artist_name=${data.artist_name}&album_name=${data.name}`
        );
        const tracksData = await response.json();

        setDataResult(tracksData.results)
        setTracks(tracksData.results)
        setURL(tracksData.results[0].audio)
        setIsLoading(false)
        return tracksData.results
    }

    useEffect(() => {
        if (isPlay) {
            setIsAuto(true)
            if (tracks.length !== 0) {
                console.log(tracks);
                const currentTrack = tracks[trackIndex]
                console.log(currentTrack);

                const timeout = setTimeout(() => {
                    const nextIndex = (trackIndex + 1) % tracks.length
                    console.log(nextIndex)
                    setTrackIndex(nextIndex)
                }, currentTrack.duration * 1000)
                 
                return () => clearTimeout(timeout)
            }
        }
    }, [trackIndex, tracks, isPlay])

    useEffect(() => {
        if(activeTrack){
           setURL(activeTrack.audio)
           setIsAuto(true)
        }
    }, [activeTrack])


    useEffect(() => {
        if (tracks.length !== 0 && isPlay) {
            const currentTrack = tracks[trackIndex]
            setActiveTrack(currentTrack)
            setURL(currentTrack.audio)
            console.log(1);
        }
    }, [trackIndex, tracks, isPlay])


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

    function getDataInAlbum(e, array) {
        e.preventDefault();
        if (search) {
            setActiveTrack(false)
            setIsEmpty(false)
            const filtered = array.filter(item => {
                return item.name.toLowerCase().includes(search.toLowerCase());
            });
            setTracks(filtered)
            if (filtered.length === 0) {
                setIsEmpty(true)
            }
        } else if (search.length === 0) {
            console.log(array);
            setTracks(array)
        }
    }

    function handleClickActive(info) {
        if (info === activeTrack) {
            setActiveTrack(false)
            audioRef.current.pause()
          } else {
            setActiveTrack(info)
            audioRef.current.play()
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

                    <audio className='audio_element' ref={audioRef} src={URL} autoPlay={isAuto} controls></audio>

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

                                    </div>
                                    <div className="content_2__buttons">

                                        {
                                            isPlay ?
                                                (<IoPauseOutline onClick={() => audioToggle()} className='album__btn' />)
                                                :
                                                (<IoPlaySharp onClick={() => audioToggle()} className='album__btn' />)
                                        }


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
                                                <AlbumCard key={item.id} info={item} isActive={item === activeTrack} handleClickActive={handleClickActive} />
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