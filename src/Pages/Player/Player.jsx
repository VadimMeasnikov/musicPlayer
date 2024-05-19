import React, { useEffect, useState } from 'react'
import chewronDown from '../../img/Chevron down.png'
import more from '../../img/more.png'
import track from '../../img/track.png'
import time from '../../img/Frame 372.png'
import { useGetTrackQuery } from '../../reduxToolkit/queryApi/tracksJamendo'
import { Back, Shuffle, Vector } from '../../img/trackFunction/index'
import { Like, Share, Radio, MoonFill, Hide, Add, Credits, Queue, View, Artist } from '../../img/modalPlayerImgs/modalIndex'
import { useNavigate, useParams } from 'react-router-dom'
import { LiaPauseSolid } from "react-icons/lia";
import { GrPlay } from "react-icons/gr";
import { LiaPlaySolid } from "react-icons/lia";
import { RxPlay } from "react-icons/rx";
import { useSearchQuery } from "../../reduxToolkit/queryApi/searchJamendo";
import useSound from 'use-sound'
import tabsData from "../../tabs.json";
import music_track from "../../tracks/The Beatles - From Me To You.mp3"
import repeat_active from '../../img/trackFunction/Repeat.png'
import repeat from '../../img/media-playlist-repeat.png'
import GetCurrentColor from '../../GetCurrentColor'
// likes
import { addLikedTrack, removeLikedTracks } from "../../reduxToolkit/slices/favouriteTracks";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

import './player.scss'






export default function Player() {
    const dispatch = useDispatch();

    const [trackName, setTrackName] = useState('')
    const [trackArtist, setTrackArtist] = useState('')
    const [trackAudio, setTrackAudio] = useState('')
    const [trackImage, setTrackImage] = useState('')
    const [trackAlbum, setTrackAlbum] = useState('')
    const [trackId, setTrackId] = useState('')

    const [averageColor, setAverageColor] = useState('')

    const [seconds, setSeconds] = useState(0);

    const [debouncedSearchValue, setDebouncedSearchValue] = useState("");
    const [tabs, setTabs] = useState(tabsData);
    const [activeTab, setActiveTab] = useState(tabs[0].path);
    const [isOpen, setIsOpen] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const [repeatState, setRepeatState] = useState(false)
    const [play, { pause, duration, sound }] = useSound(trackAudio);
    const [currTime, setCurrTime] = useState({
        min: "",
        sec: "",
    });

    const { trackIdParams } = useParams()

    const { data, error } = useSearchQuery({ path: activeTab, name: debouncedSearchValue });
    const dataRd = useSelector(state => state.search.search)
    const navigate = useNavigate()

    const likedTracksStore = useSelector((state) => state.likes.likedTracks);
    console.log(likedTracksStore);
    const [likedTracks, setLikedTracks] = useState([]);
    const [currentTrack, setCurrentTrack] = useState();


    useEffect(() => {
        if (trackId !== undefined && data !== undefined && data.results !== undefined) {
            getCurrentTrack(data.results, trackIdParams)
        }
    }, [trackId, data])

    function goBackBtn() {
        navigate(-1)
    }

    async function getCurrentTrack(array, id) {
        const currentTrack = await array.find((track) => track.id === id);
        if (currentTrack) {

            setTrackName(currentTrack.name);
            setTrackArtist(currentTrack.artist_name);
            setTrackAlbum(currentTrack.album_name);
            setTrackImage(currentTrack.image);
            setTrackAudio(currentTrack.audio);
            setTrackId(currentTrack.id)
            setCurrentTrack(currentTrack)
            return currentTrack
        } else {
            const currentTrack = dataRd[dataRd.length - 1]

            setTrackName(currentTrack.name);
            setTrackArtist(currentTrack.artist_name);
            setTrackAlbum(currentTrack.album_name);
            setTrackImage(currentTrack.image);
            setTrackAudio(currentTrack.audio);
            setTrackId(currentTrack.id)
            setCurrentTrack(currentTrack)
            return currentTrack
        }

    }

    const playingButton = () => {
        if (isPlaying) {
            pause();
            setIsPlaying(false);
        } else {
            play();
            setIsPlaying(true);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (sound) {
                setSeconds(sound.seek([]));
                const min = Math.floor(sound.seek([]) / 60);
                const sec = Math.floor(sound.seek([]) % 60);
                setCurrTime({
                    min,
                    sec,
                });
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [sound]);

    const handleColorGeneration = (color) => {
        setAverageColor(color);
    };

    const bg = `linear-gradient(to bottom, ${averageColor}, rgb(0, 0, 0))`


    // likes

    useEffect(() => {
        setLikedTracks(likedTracksStore);
    }, [likedTracksStore]);
    const handleTrackLike = (track) => {
        console.log(likedTracksStore);
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

    return (

        <div className='player' style={{ background: bg }}>
            <GetCurrentColor imageUrl={trackImage} onColorGenerated={handleColorGeneration} />
            <div className='player_container'>
                <div className={isOpen ? 'track_modal open' : 'track_modal'}>
                    <div className='track_box_modal'>

                        <img src={trackImage} width={164} height={169} alt="" />

                        <h1>{trackName}</h1>
                        <h2>{trackArtist}</h2>
                        <div className='modal_function'>
                            <div>
                                <button className="likeBtn"
                                    onClick={() => {
                                        handleTrackLike(currentTrack);
                                    }}
                                >
                                    {likedTracksStore.some(
                                        (likedTrack) => likedTrack.id === trackId
                                    ) ? (
                                        <div className="">
                                            <FaHeart className='likeBtnSVG' />
                                            <p>Unlike</p>
                                        </div>
                                    ) : (
                                        <div className="">
                                            <FaRegHeart className='likeBtnSVG' />
                                            <p>Like</p>
                                        </div>
                                    )}
                                </button>
                            </div>
                            <div>
                                <button><img src={Add} alt="" width={21} height={20} />Add to playlist</button>
                            </div>
                            <div>
                                <button><img src={Queue} alt="" width={21} height={20} />Add to queue</button>
                            </div>
                            <div>
                                <button><img src={View} alt="" width={21} height={20} />View album</button>
                            </div>
                            <div>
                                <button><img src={Artist} alt="" width={21} height={20} />View artist</button>
                            </div>
                        </div>
                        <button onClick={() => { setIsOpen(pr => !pr) }}>Close</button>
                    </div>


                </div>
                <div className='player_content'>
                    <div className='upper_info'>
                        <button className='go_back__btn_player' onClick={() => { goBackBtn() }}><img src={chewronDown} alt="" height={22} width={22} /></button>
                        <h1 className='page_player_title'>{trackAlbum}</h1>
                        <button className='more_info__btn' onClick={() => { setIsOpen(pr => !pr) }}> <img src={more} alt="" /></button>
                    </div>
                    <img src={trackImage} alt="" width={380} height={380} className='track_img' />
                    <div className='track_info'>
                        <div className="track_content_1">
                            <div className='track_info_content'>
                                <div className="marquee-container"><h2 className='track_name'>{trackName}</h2></div>
                                <h3 className='track_artist'>{trackArtist}</h3>
                            </div>
                            <div className="track_content_2">
                                <button className="likeBtn"
                                    onClick={() => {
                                        handleTrackLike(currentTrack);
                                    }}
                                >
                                    {likedTracksStore.some(
                                        (likedTrack) => likedTrack.id === trackId
                                    ) ? (
                                        <FaHeart className='likeBtnSVG' />
                                    ) : (
                                        <FaRegHeart className='likeBtnSVG' />
                                    )}
                                </button>
                            </div>
                        </div>

                        <audio src={trackAudio}></audio>

                        <input
                            type="range"
                            min="0"
                            max={duration / 1000}
                            default="0"
                            value={seconds}
                            className="timeline"
                            onChange={(e) => {
                                sound.seek([e.target.value]);
                            }}
                        />
                        <div className="track_time">
                            <p>
                                {currTime.min}:{currTime.sec}
                            </p>

                        </div>

                    </div>
                    <div className='track_function'>
                        <button className='track_function__btn shuffle'> <img src={Shuffle} alt="" width={22} height={22} /></button>
                        <button className='track_function__btn prev_track'> <img src={Back} alt="" width={36} height={37} /></button>
                        {isPlaying ?
                            (
                                <button onClick={playingButton} className='track_function__btn play'>
                                    <LiaPauseSolid id='stop' />
                                </button>
                            )
                            :
                            (
                                <button onClick={playingButton} className='track_function__btn play'>
                                    < RxPlay id='start' />
                                </button>
                            )}
                        {/* <button className='track_function__btn play'> <img src={Play} alt="" width={67} height={67} /></button> */}
                        <button className='track_function__btn next_track'> <img src={Back} alt="" width={36} height={37} className='vector' /></button>
                        <button onClick={() => handleRepeatControl()} className='track_function__btn repeat'>
                            {repeatState ?
                                (<img className='repeat_img' src={repeat_active} alt="" />)
                                :
                                (<img className='repeat_img' src={repeat} alt="" />)
                            }
                        </button>
                    </div>
                </div>

            </div>


        </div>


    )
}
