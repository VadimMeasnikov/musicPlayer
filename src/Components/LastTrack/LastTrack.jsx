import React, { useEffect, useRef, useState } from 'react'
import { MdPlayArrow } from "react-icons/md";
import { IoPauseOutline } from "react-icons/io5";
import GetCurrentColor from '../../GetCurrentColor'
import defaultImg from '../../img/default.png'

import './last_track.scss'

export default function LastTrack() {
    const [color, setColor] = useState('')
    const [trackImage, setTrackImage] = useState(defaultImg)
    const [trackName, setTrackName] = useState('')
    const [trackArtist, setTrackArtist] = useState('')
    const [URL, setURL] = useState('')

    const [isRotation, setIsRotation] = useState(false)

    const [isPlay, setIsPlay] = useState(false)
    const [device, setDevice] = useState()

    const audioRef = useRef()

    const handleColorGeneration = (color) => {
        setColor(color)
    };

    function audioControl() {
        const audio = audioRef.current
        if (audio.paused) {
            audio.play()
            setIsPlay(true)
        } else {
            audio.pause()
            setIsPlay(false)
        }
    }

    useEffect(() => {
        const track = JSON.parse(localStorage.getItem('track'));
        console.log(track);
        if (track) {
            setTrackImage(track.image)
            setTrackName(track.name)
            setTrackArtist(track.artist_name)
            setURL(track.audio)
        }
    }, [])

    useEffect(() => {
        if (trackArtist) {
            if (trackName.length + trackArtist.length >= 35) {
                console.log(trackName.length + trackArtist.length);
                setIsRotation(true)
            } else {
                console.log(trackName.length + trackArtist.length);
            }
        } else {
            setIsRotation(false)
        }
    }, [trackArtist, trackName])

    const bg = `${color}`

    return (
        <div className='last_track' style={{ background: bg }}>
            <audio className='audio_element' ref={audioRef} src={URL} controls></audio>
            <GetCurrentColor imageUrl={trackImage} onColorGenerated={handleColorGeneration} />
            <div className="last_track_container">
                <div className="track_image_box">
                    <img className='last_track_img__content' src={trackImage} alt="" />
                </div>
                <div className="track_main_content">
                    <div className={`title_box ${isRotation && ('rotationLastTrack')}`}>
                        <p className='track_name_text'>
                            {trackName} •
                        </p>
                        <p className='track_name_artist'>
                            {trackArtist}
                        </p>
                    </div>
                    <div className="device_content">
                        <p>{device}</p>
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
