import React, { useEffect, useRef, useState } from 'react'
import { MdPlayArrow } from "react-icons/md";
import { IoPauseOutline } from "react-icons/io5";
import GetCurrentColor from '../../GetCurrentColor'
import defaultImg from '../../img/default.png'
import { useDispatch, useSelector } from 'react-redux';
import { setAudio } from '../../reduxToolkit/slices/appAudio';
import './last_track.scss'



export default function LastTrack() {
    const [color, setColor] = useState('')
    const [trackImage, setTrackImage] = useState(defaultImg)
    const [trackName, setTrackName] = useState('')
    const [trackArtist, setTrackArtist] = useState('')
    const [URL, setURL] = useState('')
    const [isData, setIsData] = useState(false)
    const [isRotation, setIsRotation] = useState(false)
    const [isPlay, setIsPlay] = useState(false)

    const audioRef = useRef()
    const dispatch = useDispatch()
    const audioSettings = useSelector(state => state.audio)
    const trackLS = JSON.parse(localStorage.getItem('track'));

    useEffect(() => {
        if (audioSettings.isPlay) {
            setIsPlay(true)
        } else {
            setIsPlay(false)
        }
    }, [audioSettings])
    const handleColorGeneration = (color) => {
        setColor(color)
    };
    function audioControl() {
        const audio = audioRef.current
        if (audio.paused) {
            dispatch(setAudio({
                audio: URL,
                isPlay: true
            }))
            audio.play()
            setIsPlay(true)
        } else {
            dispatch(setAudio({
                audio: URL,
                isPlay: false
            }))
            audio.pause()
            setIsPlay(false)
        }
    }
    useEffect(() => {
        const track = JSON.parse(localStorage.getItem('track'));
        if (track !== null) {
            setIsData(true)
            setTrackImage(track.image)
            setTrackName(track.name)
            setTrackArtist(track.artist_name)
            setURL(track.audio)
        }
    }, [])

    useEffect(() => {
        if(trackLS){
            setIsData(true)
            setTrackImage(trackLS.image)
            setTrackName(trackLS.name)
            setTrackArtist(trackLS.artist_name)
            setURL(trackLS.audio)
        }
    }, [trackLS])

    useEffect(() => {
        if (trackArtist) {
            if (trackName.length + trackArtist.length >= 35) {
                setIsRotation(true)
            }
        } else {
            setIsRotation(false)
        }
    }, [trackArtist, trackName])

    
    const bg = `${color}`


    return (
        <div className={`${isData ? ('visible_track') : ('last_track')}`} style={{ background: bg }}>
            <audio className='audio_element' ref={audioRef} src={URL} muted='true' controls></audio>
            <GetCurrentColor imageUrl={trackImage} onColorGenerated={handleColorGeneration} />
            <div className="last_track_container">
                <div className="track_image_box">
                    <img className='last_track_img__content' src={trackImage} alt="" />
                </div>
                <div className="track_main_content">
                    <div className={`title_box ${isRotation && ('rotationLastTrack')}`}>
                        <p className='track_name_text'>
                            {trackName} {trackArtist && "•"}
                        </p>
                        <p className='track_name_artist'>
                            {trackArtist}
                        </p>
                    </div>
                </div>
                <div className="track_funcrion_box">
                    {
                        isPlay ?
                            (<IoPauseOutline onClick={() => audioControl()} className='last_track__btn' />)
                            :
                            (<MdPlayArrow onClick={() => audioControl()} className='last_track__btn' />)
                    }
                </div>
            </div>
        </div>
    )
}

