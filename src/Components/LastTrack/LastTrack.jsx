import React, { useState } from 'react'
import { MdPlayArrow } from "react-icons/md";
import { IoPauseOutline } from "react-icons/io5";
import GetCurrentColor from '../../GetCurrentColor'
import './last_track.scss'

export default function LastTrack() {
    const [color, setColor] = useState('')
    const [trackImage, setTrackImage] = useState()
    const [trackName, setTrackName] = useState('')
    const [trackArtist, setTrackArtist] = useState('')

    const handleColorGeneration = (color) => {
        setColor(color);
    };

    return (
        <div className='last_track'>
            <GetCurrentColor imageUrl={trackImage} onColorGenerated={handleColorGeneration} />
            <div className="last_track_container">
                <div className="track_image_box">
                    <img src={trackImage} alt="" />
                </div>
                <div className="track_main_content">
                    <div className="title_box">
                        <p className='track_name_text'>
                            {trackName} 
                        </p>
                        <p>•</p>
                        <p className='track_name_artist'>
                            {trackArtist}
                        </p>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}
